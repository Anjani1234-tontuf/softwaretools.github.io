<?php
date_default_timezone_set('America/New_York');
$xml_current_cond = new SimpleXMLElement(file_get_contents("http://api.wunderground.com/weatherstation/WXCurrentObXML.asp?ID=KMACAMBR4"));
echo "<!DOCTYPE HTML>\n";
echo "<html>\n";
echo "<head>\n";
echo "  <meta http-equiv=\"content-type\" content=\"text/html; charset=ISO-8859-1\">\n";
echo "<meta name=\"viewport\" content=\"initial-scale=1.0, maximum-scale=1.0, width=device-width\">\n";
echo "  <link rel=\"icon\" href=\"GraphicWidgets/champagne.ico\" type=\"image/x-icon\">\n";
echo "\n<script type=\"text/javascript\">\n";
echo("var ctf = $xml_current_cond->temp_f;\n");
echo("var cws =  '$xml_current_cond->wind_string';\n");
echo("var crh =  $xml_current_cond->relative_humidity;\n");
echo("var asof =  '$xml_current_cond->observation_time_rfc822';\n");
echo "</script>\n\n";
echo "\n";
echo "<title>Indoor Relative Humidity</title>\n";
echo "\n";
echo "<script type=\"text/javascript\" src=\"js/gjcore.min.js\"></script>\n";
echo "<script type=\"text/javascript\" src=\"js/gjutil1.min.js\"></script>\n";
echo "<script type=\"text/javascript\" src=\"js/gjtrack.js\"></script>\n";
echo "<style type=\"text/css\">\n";
echo "body {max-width:1000px;display:block; margin:auto;}";
echo "#details,#theop {width:1000px}";
echo ".mppad\n";
echo "{\n";
echo "  margin: 2em;\n";
echo "}\n";
echo ".aliceblue\n";
echo "{\n";
echo "background-color:aliceblue;\n";
echo "}\n";
echo ".lightgray\n";
echo "{\n";
echo "background-color:lightgrey;\n";
echo "}\n";
echo ".lightskyblue\n";
echo "{\n";
echo "background-color:lightskyblue;\n";
echo "}\n";
echo "p\n";
echo "{\n";
echo "  margin-top:0in;\n";
echo "  margin-right:7.5pt;\n";
echo "  margin-bottom:.0001pt;\n";
echo "  font-size:10.0pt;\n";
echo "  font-family: Verdana, Arial, Helvetica, sans-serif;\n";
echo "}\n";
echo "table { \n";
echo "border-collapse: collapse;}\n";
echo "table td, table th {\n";
echo "padding: 0;\n";
echo "border:none;\n";
echo "vertical-align:top;}\n";
echo ".w1{width:50%}\n";
echo ".w2{width:40%}\n";
echo "/* ----------------------------- */\n";
echo "@media only screen and (orientation:portrait) ,\n";
echo "only screen and (orientation:landscape) and (max-width:736px) {\n";
echo ".one{margin-left:10px;}\n";
echo ".two{\n";
echo "border:none;\n";
echo "color: black;\n";
echo "margin: auto;\n";
echo "padding:10px;\n";
echo "width:100%;\n";
echo "font-size:14px;\n";
echo "font-weight: bolder;\n";
echo "font-family: Verdana, Arial, Helvetica, sans-serif;\n";
echo "}\n";
echo ".container {width: 100%; padding: 0 0}\n";
echo ".noMobile { display:none; }\n";
echo "body {\n";
echo "width:100%;\n";
echo "font-size:16px;\n";
echo "margin:2px 5px;}\n";
echo "#theop { display:none; }\n";
echo ".w1{width:100%}\n";
echo ".w2{width:220px;}\n";
echo "</style>\n";
echo "\n";
echo "</head>\n";
echo "\n";
echo "<body onload=doIt()>\n";
echo "<div style=\"max-width:1000px;display:block;margin:auto;overflow:auto;\">\n";
echo "<a style=\"float:right;\" href=\"http://www.wunderground.com/weatherstation/WXDailyHistory.asp?ID=KMACAMBR4\"><img src=\"http://banners.wunderground.com/cgi-bin/banner/ban/wxBanner?bannertype=pws250&weatherstationcount=KMACAMBR4\" width=\"250\" height=\"150\" border=\"0\" alt=\"Weather Underground PWS KMACAMBR4\" /></a>\n";
echo '<b>', date("F j, Y, g:i a"), '</b><br>';
echo "\n";
echo "<TABLE class=\"w1\">\n";
echo "  <FORM NAME =\"formWeatherIH\">\n";
echo "\n";
echo "    <TR>\n";
echo "      <TD class=\"w2\">Outdoor Temperature:</TD>\n";
echo "      <TD><INPUT TYPE=\"TEXT\" VALUE=\"\" SIZE=\"5\" NAME=\"T\">&nbsp;&deg;F</TD>\n";
echo "    </TR>\n";
echo "\n";
echo "    <TR>\n";
echo "      <TD>Outdoor Humidity:</TD>\n";
echo "      <TD><INPUT TYPE=\"TEXT\" VALUE=\"\" SIZE=\"5\" NAME=\"RHo\">&nbsp;%</TD>\n";
echo "    </TR>\n";
echo "\n";
echo "    <TR>\n";
echo "      <TD>Indoor Temperature:</TD>\n";
echo "      <TD ><INPUT TYPE=\"TEXT\" VALUE=\"\" SIZE=\"5\" NAME=\"Th\">&nbsp;&deg;F</TD>\n";
echo "    </TR>\n";
echo "\n";
echo "    <TR>\n";
echo "      <TD>Air conditioner on?</TD>\n";
echo "      <TD><INPUT TYPE=\"RADIO\" VALUE=\"T\" NAME=\"ac\">Yes <INPUT TYPE=\"RADIO\" VALUE=\"F\" NAME=\"ac\" CHECKED>No</TD>\n";
echo "    </tr>\n";
echo "\n";
echo "    <tr>\n";
echo "      <td colspan=\"2\"><p><INPUT TYPE=\"button\" NAME=\"calculate\" VALUE=\"Calc\" onClick=\"calculateHumidity()\">    <span id=\"results\">&nbsp;</span></p>\n";
echo "     </TD>\n";
echo "     </TR>\n";
echo "\n";
echo "</table>\n";
echo "\n";
echo "</div>\n";
echo "<div id=\"testplace\" style=\"height:30em; max-width:1000px;overflow:auto;overflow-x:auto;overflow-y:auto;\">\n";
echo "<p id='details'>&nbsp;</p>\n";
echo "<pre id='theop'> </pre>\n";
echo "</div>\n";
echo "<script language=\"JavaScript\">\n";
echo "\n";
echo "function doIt()\n";
echo "{\n";
echo "/*\n";
echo "to do\n";
echo "1) compare server date to Observation time and check to see if same day\n";
echo "for the indoorRH browser version, use the Browser date\n";
echo "\n";
echo "check server date echo '<b>', date(\"r\"), '</b><br>';\n";
echo "against echo(\"var asof =  '$xml_current_cond->observation_time_rfc822';\n\");\n";
echo "\n";
echo "WeatherUndergrouund format\n";
echo "Fri, 08 April 2011 12:00:5 GMT -- observation_time_rfc822\n";
echo "\n";
echo "According to this\n";
echo "http://www.w3.org/Protocols/rfc822/#z28\n";
echo "it should be a 3 digit month like Apr\n";
echo "\n";
echo "FYI\n";
echo "php generates date as\n";
echo "Fri, 08 Apr 2011 08:03:59 -0400 -- date(\"r\")\n";
echo "\n";
echo "RFC 2822 formatted date 	Example: Thu, 21 Dec 2000 16:01:07 +0200\n";
echo "\n";
echo "http://www.w3.org/Protocols/rfc822/\n";
echo "\n";
echo "rfc2822 supsedes rfc822\n";
echo "\n";
echo "2) add in acuse ac use\n";
echo "\n";
echo "3) put in file check to make sure its not executed from local\n";
echo "\n";
echo "*/\n";
echo "var acuse;\n";
echo "document.formWeatherIH.RHo.value = crh;\n";
echo "if(ctf > 67)\n";
echo "{\n";
echo "  document.formWeatherIH.Th.value =ctf;\n";
echo "}\n";
echo "else\n";
echo "{\n";
echo "  document.formWeatherIH.Th.value =68;\n";
echo "}\n";
echo "document.formWeatherIH.T.value=ctf;\n";
echo "\n";
echo "if(ctf > 80)\n";
echo "{\n";
echo "  document.formWeatherIH.ac[0].checked =true;\n";
echo "  acuse=true;\n";
echo "}\n";
echo "else\n";
echo "{\n";
echo "  document.formWeatherIH.ac[1].checked = true;\n";
echo "  acuse=false;\n";
echo "}\n";
echo "\n";
echo "\n";
echo "calculatemyHumidity(ctf -0,cws,crh- 0, asof);\n";
echo "if(!acuse)\n";
echo "{\n";
echo "  calculateHumidityTable();\n";
echo "}\n";
echo "\n";
echo "}\n";
echo "\n";
echo "\n";
echo "function calculateHumidityTable()\n";
echo "{\n";
echo "\n";
echo "  var myhead = \"Outdoor\";\n";
echo "  changeInnerHTML(\"theop\", returnInnerHTML(\"theop\") + \"<br>\" + myhead);\n";
echo "\n";
echo "  myhead = \"Temp                                                   Outdoor Humidity\";\n";
echo "  changeInnerHTML(\"theop\", returnInnerHTML(\"theop\") + \"<br>\" + myhead);\n";
echo "\n";
echo "  myhead = \"          0    5   10   15   20   25   30   35   40   45   50   55   60   65   70   75   80   85   90   95  100\";\n";
echo "  changeInnerHTML(\"theop\", returnInnerHTML(\"theop\") + \"<br>\" + myhead);\n";
echo "\n";
echo "  myhead = \"\";\n";
echo "  changeInnerHTML(\"theop\", returnInnerHTML(\"theop\") + \"<br>\" + myhead);\n";
echo "\n";
echo "  myhead = \"                                                     Indoor Humidity at 68&deg;\";\n";
echo "  changeInnerHTML(\"theop\", returnInnerHTML(\"theop\") + \"<br>\" + myhead);\n";
echo "\n";
echo "\n";
echo "  for (var x = 0; x < 80; x+=5)  //temp\n";
echo "  {\n";
echo "    var myop=\"\";\n";
echo "    if (x == 70) x = 68;\n";
echo "\n";
echo "\n";
echo "    for (var y = 0; y < 105; y+=5)  //rh\n";
echo "    {\n";
echo "      var rho = y; //45\n";
echo "\n";
echo "      var thc = 5/9*(68 - 32);  //indoor temp in celsius 5/9*(68-32) = 20\n";
echo "      var tc = 5/9*(x - 32);  //outdoor temp 5/9*(35-32)  1.67\n";
echo "\n";
echo "      var power = 7.5*thc/(237.7+thc); // 7.5*20 /(237.7+20) = .58\n";
echo "      var num = Math.pow(10, power); //Math.pow(10, .58) = 3.8\n";
echo "      var esi = 6.11*num;  //6.11*3.8 = 23\n";
echo "\n";
echo "      power = 7.5*tc/(237.7+tc); // 7.5*1.67/(237.7+1.67) = .052\n";
echo "      num = Math.pow(10, power);  //Math.pow(10, .052) = 1.127\n";
echo "      var eso = 6.11*num; //6.11*1.127 = 6.89\n";
echo "      var ihumidity = Math.round(rho*eso/esi); // Math.round( 45*6.89/23) = 13% dry\n";
echo "      myop = myop + padit(ihumidity);\n";
echo "    }\n";
echo "\n";
echo "    changeInnerHTML(\"theop\", returnInnerHTML(\"theop\") + \"<br>\" + padx(x) + \"&deg;\" + myop);\n";
echo "    if((x == 50) || (x == 30))\n";
echo "    changeInnerHTML(\"theop\", returnInnerHTML(\"theop\") + \"<br>\" );\n";
echo "    if(x == 68) break;\n";
echo "  }\n";
echo "}\n";
echo "\n";
echo "function padx(x)\n";
echo "{\n";
echo "  var mytempop;\n";
echo "  if(x == 0)\n";
echo "  mytempop = \"    \" + x;\n";
echo "  else if(x < 10)\n";
echo "  mytempop = \"    \" + x;\n";
echo "  else if (x < 100)\n";
echo "  mytempop = \"   \" + x;\n";
echo "  else if (x == 100)\n";
echo "  mytempop = \"  \" + x;\n";
echo "  else if (x > 100)\n";
echo "  mytempop = \"     \";\n";
echo "\n";
echo "  return mytempop;\n";
echo "}\n";
echo "\n";
echo "function padit(y)\n";
echo "{\n";
echo "  var mytempop; var x;\n";
echo "  x = y;\n";
echo "  if(x == 0)\n";
echo "  mytempop = \"    \" + x;\n";
echo "  else if(x < 10)\n";
echo "  mytempop = \"    \" + x;\n";
echo "  else if (x < 100)\n";
echo "  mytempop = \"   \" + x;\n";
echo "  else if (x == 100)\n";
echo "  mytempop = \"  \" + x;\n";
echo "  else if (x > 100)\n";
echo "  mytempop = \"     \";\n";
echo "\n";
echo "  if(y < 30)\n";
echo "  return \"<FONT color='red'>\" + mytempop + \"</FONT>\";\n";
echo "  else return mytempop;\n";
echo "}\n";
echo "\n";
echo "\n";
echo "\n";
echo "function calculatemyHumidity(itf, iws, irh, when )\n";
echo "{\n";
echo "\n";
echo " if(itf > 80)\n";
echo "{\n";
echo "    changeInnerHTML(\"results\", \"Not Done\");\n";
echo "\n";
echo "     myop = \" Outdoor Temp \" + itf +  \"&deg; &frasl; with AC on not done \";\n";
echo "\n";
echo "    changeInnerHTML(\"details\", \"<br>\" + myop + \"<br>\");\n";
echo "return;\n";
echo "}\n";
echo "\n";
echo "\n";
echo "    var rho = irh;\n";
echo "\n";
echo "    var thc = 5/9*(68 - 32);  //indoor temp in celsius 5/9*(68-32) = 20\n";
echo "    var tc = 5/9*(itf - 32);\n";
echo "\n";
echo "    var power = 7.5*thc/(237.7+thc); // 7.5*20 /(237.7+20) = .58\n";
echo "    var num = Math.pow(10, power); //Math.pow(10, .58) = 3.8\n";
echo "    var esi = 6.11*num;  //6.11*3.8 = 23\n";
echo "\n";
echo "    power = 7.5*tc/(237.7+tc); // 7.5*1.67/(237.7+1.67) = .052\n";
echo "    num = Math.pow(10, power);  //Math.pow(10, .052) = 1.127\n";
echo "    var eso = 6.11*num; //6.11*1.127 = 6.89\n";
echo "    var ihumidity = Math.round(rho*eso/esi); // Math.round( 45*6.89/23) = 13% dry\n";
echo "    var shumidity = \"\";\n";
echo "\n";
echo "    if (ihumidity > 100)\n";
echo "    {\n";
echo "      ihumidity = 100;\n";
echo "    }\n";
echo "    if (ihumidity < 0)\n";
echo "    {\n";
echo "      ihumidity = 0;\n";
echo "    }\n";
echo "    if ((ihumidity >= 0) && (ihumidity <= 30))\n";
echo "    {\n";
echo "      shumidity =\"<FONT color='red'> % DRY </FONT>\";\n";
echo "    }\n";
echo "    else if ((ihumidity >= 31) && (ihumidity <= 51))\n";
echo "    {\n";
echo "      shumidity =\"% COMFORTABLE\";\n";
echo "    }\n";
echo "    else\n";
echo "    {\n";
echo "      shumidity = \"<FONT color='blue'> % WET </FONT>\";\n";
echo "    }\n";
echo "\n";
echo "    changeInnerHTML(\"results\", ihumidity.toString() + shumidity);\n";
echo "\n";
echo "     myop = \"<br>Outdoor Temp \" + itf +  \"&deg; \"  + \" Outdoor humidity \" + irh + \"<br> Indoor Temp 68 \" + \" Indoor Humity \" + ihumidity.toString() + shumidity;\n";
echo "\n";
echo "    changeInnerHTML(\"details\", \"<br>\" + myop + \"<br><br>Outdoor Temperature and Humidity from Weather Station KMACAMBR4 Central Square, Cambridge,MA\");\n";
echo "\n";
echo "}\n";
echo "\n";
echo "function calculateHumidity()\n";
echo "{\n";
echo "\n";
echo "// outdoor temp 35 out door rh 45  thermostat 68\n";
echo "/*\n";
echo "\n";
echo "Relative Humidity(%) Knowing Tdf and Tf= 	RH = (((6.11*10^(7.5*((Tdf-32)/1.8)/(237.7+((Tdf-32)/1.8))))/((6.11*10^(7.5*((Tf-32)/1.8)/\n";
echo "(237.7+((Tf-32)/1.8)))))*100))\n";
echo "\n";
echo "http://www.aprweather.com/pages/calc.htm\n";
echo "*/\n";
echo "    var rho = document.formWeatherIH.RHo.value; //45\n";
echo "\n";
echo "\n";
echo "    var thc = 5/9*(document.formWeatherIH.Th.value - 32);  //indoor temp in celsius 5/9*(68-32) = 20\n";
echo "    var tc = 5/9*(document.formWeatherIH.T.value - 32);  //outdoor temp 5/9*(35-32)  1.67\n";
echo "\n";
echo "    // if(tc > 26.6 || tc > thc) if outdoor temp> 80F and outdoor temp > indoor temp - celsius\n";
echo "     if(tc > 26.6)\n";
echo "     {\n";
echo "       changeInnerHTML(\"results\", \"Not Done\");\n";
echo "\n";
echo "       myop = \" Outdoor Temp \" + tc +  \"&deg; > 26.6 celsius (80F) &frasl; with AC on not done \";\n";
echo "\n";
echo "       changeInnerHTML(\"details\", \"<br>\" + myop + \"<br>\");\n";
echo "       return;\n";
echo "     }\n";
echo "\n";
echo "    var power = 7.5*thc/(237.7+thc); // 7.5*20 /(237.7+20) = .58\n";
echo "    var num = Math.pow(10, power); //Math.pow(10, .58) = 3.8\n";
echo "    var esi = 6.11*num;  //6.11*3.8 = 23\n";
echo "\n";
echo "    power = 7.5*tc/(237.7+tc); // 7.5*1.67/(237.7+1.67) = .052\n";
echo "    num = Math.pow(10, power);  //Math.pow(10, .052) = 1.127\n";
echo "    var eso = 6.11*num; //6.11*1.127 = 6.89\n";
echo "    var ihumidity = Math.round(rho*eso/esi); // Math.round( 45*6.89/23) = 13% dry\n";
echo "    var shumidity = \"\";\n";
echo "\n";
echo "    if (document.formWeatherIH.ac[0].checked ==true)\n";
echo "    {\n";
echo "      acuse = true;\n";
echo "    }\n";
echo "    else\n";
echo "    {\n";
echo "     acuse = false\n";
echo "    }\n";
echo "\n";
echo "    if (ihumidity > 100)\n";
echo "    {\n";
echo "      ihumidity = 100;\n";
echo "    }\n";
echo "    if (ihumidity < 0)\n";
echo "    {\n";
echo "      ihumidity = 0;\n";
echo "    }\n";
echo "    if ((ihumidity >= 0) && (ihumidity <= 30))\n";
echo "    {\n";
echo "      shumidity =\"<FONT color='red'> % DRY </FONT>\";\n";
echo "    }\n";
echo "    else if ((ihumidity >= 31) && (ihumidity <= 51))\n";
echo "    {\n";
echo "      shumidity =\"% COMFORTABLE\";\n";
echo "    }\n";
echo "    else\n";
echo "    {\n";
echo "      shumidity = \"<FONT color='blue'> % WET </FONT>\";\n";
echo "    }\n";
echo "\n";
echo "    changeInnerHTML(\"results\", ihumidity.toString() + shumidity);\n";
echo "\n";
echo "}\n";
echo "\n";
echo "\n";
echo "</script>\n";
echo "<H1>A simple test</H1>\n";
echo "<p>Fill a glass with cubes and then add water.  After the three minutes, look at the glass. If there is condensation, then the humidity is above 30%. Otherwise, you need a humidifier.  In the northeast, when the outside temperature is below 35&deg;, most non humid houses will usually need a humidifier.  In the table above, the red shows the combination of outdoor temperature and humidity where it is nice to have a humdifier going.</p>\n";
echo "\n";
echo "</body>\n";
echo "</html>\n";
