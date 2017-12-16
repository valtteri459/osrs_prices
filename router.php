<?php
error_reporting(-1);
ini_set('display_errors', 'On');
	function get_remote_data($url, $post_paramtrs = false) {
        $c = curl_init();
        curl_setopt($c, CURLOPT_URL, $url);
        curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
        if ($post_paramtrs) {
            curl_setopt($c, CURLOPT_POST, TRUE);
            curl_setopt($c, CURLOPT_POSTFIELDS, "var1=bla&" . $post_paramtrs);
        } curl_setopt($c, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($c, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($c, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1; rv:33.0) Gecko/20100101 Firefox/33.0");
        curl_setopt($c, CURLOPT_COOKIE, 'CookieName1=Value;');
        curl_setopt($c, CURLOPT_MAXREDIRS, 10);
        $follow_allowed = ( ini_get('open_basedir') || ini_get('safe_mode')) ? false : true;
        if ($follow_allowed) {
            curl_setopt($c, CURLOPT_FOLLOWLOCATION, 1);
        }curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 9);
        curl_setopt($c, CURLOPT_REFERER, $url);
        curl_setopt($c, CURLOPT_TIMEOUT, 60);
        curl_setopt($c, CURLOPT_AUTOREFERER, true);
        curl_setopt($c, CURLOPT_ENCODING, 'gzip,deflate');
        $data = curl_exec($c);
        $status = curl_getinfo($c);
        curl_close($c);
        preg_match('/(http(|s)):\/\/(.*?)\/(.*\/|)/si', $status['url'], $link);
        $data = preg_replace('/(src|href|action)=(\'|\")((?!(http|https|javascript:|\/\/|\/)).*?)(\'|\")/si', '$1=$2' . $link[0] . '$3$4$5', $data);
        $data = preg_replace('/(src|href|action)=(\'|\")((?!(http|https|javascript:|\/\/)).*?)(\'|\")/si', '$1=$2' . $link[1] . '://' . $link[3] . '$3$4$5', $data);
        if ($status['http_code'] == 200) {
            return $data;
        } elseif ($status['http_code'] == 301 || $status['http_code'] == 302) {
            if (!$follow_allowed) {
                if (empty($redirURL)) {
                    if (!empty($status['redirect_url'])) {
                        $redirURL = $status['redirect_url'];
                    }
                } if (empty($redirURL)) {
                    preg_match('/(Location:|URI:)(.*?)(\r|\n)/si', $data, $m);
                    if (!empty($m[2])) {
                        $redirURL = $m[2];
                    }
                } if (empty($redirURL)) {
                    preg_match('/href\=\"(.*?)\"(.*?)here\<\/a\>/si', $data, $m);
                    if (!empty($m[1])) {
                        $redirURL = $m[1];
                    }
                } if (!empty($redirURL)) {
                    $t = debug_backtrace();
                    return call_user_func($t[0]["function"], trim($redirURL), $post_paramtrs);
                }
            }
        } return "ERRORCODE22 with $url!!<br/>Last status codes<b/>:" . json_encode($status) . "<br/><br/>Last data got<br/>:$data";
    }


    /*in the future I can make a smart api call caching algorithm here if I need it*/
    function apicall($target){
        //save the target to an unchanged variable for the potential http request
        $targetRaw = $target;
        //replace some symbols in the URL so it can be used as the filename for the cached file
        $target = str_replace("&", "-", str_replace("/", "_", $target));
        //set the current time and hardcoded 1 hour expiration
        $current_time = time(); $expire_time = 60*60; /*1 hour*/;
        //check if a cache exists
        if(file_exists("./cached_requests/$target")){

            //check file time and check if it has expired
            $file_time = filemtime("./cached_requests/$target");
            if($current_time - $expire_time < $file_time)
            {
                //return cached
                return file_get_contents("./cached_requests/$target");
            }else{
                //refresh cache
                $content = get_remote_data($targetRaw);
                file_put_contents("./cached_requests/$target", $content);
                return $content;
            }
            
        }else{
            //refresh cache
            $content = get_remote_data($targetRaw);
            file_put_contents("./cached_requests/$target", $content);
            return $content;
        }
    }

	$requested_resource = $_GET["a"];

	switch($requested_resource){
		case "items":
			$items = json_decode(apicall("https://rsbuddy.com/exchange/summary.json"));
            $limits = json_decode(file_get_contents("limits_formatted.json"));
            $itemBase = json_decode(apicall("http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=2"));
            $itemBaseExploded = explode("?id", $itemBase->item->icon);
            $items->iconBase = "https:".substr($itemBaseExploded[0],5);
            $items->limits = $limits;
            echo json_encode($items);
			break;
		case "itemInfo":
			if(!empty($_GET["itemID"]))
			{
				$itemID = $_GET["itemID"];
				$jagexDetails	= json_decode(apicall("http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=$itemID"));
				$osbDetails 	= json_decode(apicall("https://api.rsbuddy.com/grandExchange/?a=guidePrice&i=$itemID"));
				$jagexGraph 	= json_decode(apicall("http://services.runescape.com/m=itemdb_oldschool/api/graph/$itemID.json"));
				$osbGraph		= json_decode(apicall("https://api.rsbuddy.com/grandExchange/?a=graph&g=1440&start=".((time()-3600*24*180)*1000)."&i=$itemID"));
				$resArray = array(
					"jagexInfo"	=> $jagexDetails,
					"osbInfo"	=> $osbDetails,
					"jagexGraph"=> $jagexGraph,
					"osbGraph"	=> $osbGraph,
					"osbSearchq"=> "https://api.rsbuddy.com/grandExchange/?a=graph&g=1440&start=".((time()-3600*24*180)*1000)."&i=$itemID"
				);
				echo json_encode($resArray);
			}
			else{
				echo json_encode(array("error"=>"no itemID selected"));
			}
	}