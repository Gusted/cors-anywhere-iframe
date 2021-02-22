"use strict"
var __create = Object.create, __defProp = Object.defineProperty, __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty, __getOwnPropNames = Object.getOwnPropertyNames, __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: !0});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: !0});
}, __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 == "object" || typeof module2 == "function")
    for (let key of __getOwnPropNames(module2))
      !__hasOwnProp.call(target, key) && key !== "default" && __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  return target;
}, __toModule = (module2) => module2 && module2.__esModule ? module2 : __exportStar(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", {value: module2, enumerable: !0})), module2);

// src/cors-anywhere-iframe.ts
__markAsModule(exports);
__export(exports, {
  createRateLimitChecker: () => createRateLimitChecker2,
  getHandler: () => getHandler
});
var import_net = __toModule(require("net"));

// src/regexp-top-level-domain.ts
var regexp_top_level_domain_default = /\.(?:AAA|AARP|ABARTH|ABB|ABBOTT|ABBVIE|ABC|ABLE|ABOGADO|ABUDHABI|AC|ACADEMY|ACCENTURE|ACCOUNTANT|ACCOUNTANTS|ACO|ACTOR|AD|ADAC|ADS|ADULT|AE|AEG|AERO|AETNA|AF|AFAMILYCOMPANY|AFL|AFRICA|AG|AGAKHAN|AGENCY|AI|AIG|AIRBUS|AIRFORCE|AIRTEL|AKDN|AL|ALFAROMEO|ALIBABA|ALIPAY|ALLFINANZ|ALLSTATE|ALLY|ALSACE|ALSTOM|AM|AMAZON|AMERICANEXPRESS|AMERICANFAMILY|AMEX|AMFAM|AMICA|AMSTERDAM|ANALYTICS|ANDROID|ANQUAN|ANZ|AO|AOL|APARTMENTS|APP|APPLE|AQ|AQUARELLE|AR|ARAB|ARAMCO|ARCHI|ARMY|ARPA|ART|ARTE|AS|ASDA|ASIA|ASSOCIATES|AT|ATHLETA|ATTORNEY|AU|AUCTION|AUDI|AUDIBLE|AUDIO|AUSPOST|AUTHOR|AUTO|AUTOS|AVIANCA|AW|AWS|AX|AXA|AZ|AZURE|BA|BABY|BAIDU|BANAMEX|BANANAREPUBLIC|BAND|BANK|BAR|BARCELONA|BARCLAYCARD|BARCLAYS|BAREFOOT|BARGAINS|BASEBALL|BASKETBALL|BAUHAUS|BAYERN|BB|BBC|BBT|BBVA|BCG|BCN|BD|BE|BEATS|BEAUTY|BEER|BENTLEY|BERLIN|BEST|BESTBUY|BET|BF|BG|BH|BHARTI|BI|BIBLE|BID|BIKE|BING|BINGO|BIO|BIZ|BJ|BLACK|BLACKFRIDAY|BLOCKBUSTER|BLOG|BLOOMBERG|BLUE|BM|BMS|BMW|BN|BNPPARIBAS|BO|BOATS|BOEHRINGER|BOFA|BOM|BOND|BOO|BOOK|BOOKING|BOSCH|BOSTIK|BOSTON|BOT|BOUTIQUE|BOX|BR|BRADESCO|BRIDGESTONE|BROADWAY|BROKER|BROTHER|BRUSSELS|BS|BT|BUDAPEST|BUGATTI|BUILD|BUILDERS|BUSINESS|BUY|BUZZ|BV|BW|BY|BZ|BZH|CA|CAB|CAFE|CAL|CALL|CALVINKLEIN|CAM|CAMERA|CAMP|CANCERRESEARCH|CANON|CAPETOWN|CAPITAL|CAPITALONE|CAR|CARAVAN|CARDS|CARE|CAREER|CAREERS|CARS|CASA|CASE|CASH|CASINO|CAT|CATERING|CATHOLIC|CBA|CBN|CBRE|CBS|CC|CD|CENTER|CEO|CERN|CF|CFA|CFD|CG|CH|CHANEL|CHANNEL|CHARITY|CHASE|CHAT|CHEAP|CHINTAI|CHRISTMAS|CHROME|CHURCH|CI|CIPRIANI|CIRCLE|CISCO|CITADEL|CITI|CITIC|CITY|CITYEATS|CK|CL|CLAIMS|CLEANING|CLICK|CLINIC|CLINIQUE|CLOTHING|CLOUD|CLUB|CLUBMED|CM|CN|CO|COACH|CODES|COFFEE|COLLEGE|COLOGNE|COM|COMCAST|COMMBANK|COMMUNITY|COMPANY|COMPARE|COMPUTER|COMSEC|CONDOS|CONSTRUCTION|CONSULTING|CONTACT|CONTRACTORS|COOKING|COOKINGCHANNEL|COOL|COOP|CORSICA|COUNTRY|COUPON|COUPONS|COURSES|CPA|CR|CREDIT|CREDITCARD|CREDITUNION|CRICKET|CROWN|CRS|CRUISE|CRUISES|CSC|CU|CUISINELLA|CV|CW|CX|CY|CYMRU|CYOU|CZ|DABUR|DAD|DANCE|DATA|DATE|DATING|DATSUN|DAY|DCLK|DDS|DE|DEAL|DEALER|DEALS|DEGREE|DELIVERY|DELL|DELOITTE|DELTA|DEMOCRAT|DENTAL|DENTIST|DESI|DESIGN|DEV|DHL|DIAMONDS|DIET|DIGITAL|DIRECT|DIRECTORY|DISCOUNT|DISCOVER|DISH|DIY|DJ|DK|DM|DNP|DO|DOCS|DOCTOR|DOG|DOMAINS|DOT|DOWNLOAD|DRIVE|DTV|DUBAI|DUCK|DUNLOP|DUPONT|DURBAN|DVAG|DVR|DZ|EARTH|EAT|EC|ECO|EDEKA|EDU|EDUCATION|EE|EG|EMAIL|EMERCK|ENERGY|ENGINEER|ENGINEERING|ENTERPRISES|EPSON|EQUIPMENT|ER|ERICSSON|ERNI|ES|ESQ|ESTATE|ET|ETISALAT|EU|EUROVISION|EUS|EVENTS|EXCHANGE|EXPERT|EXPOSED|EXPRESS|EXTRASPACE|FAGE|FAIL|FAIRWINDS|FAITH|FAMILY|FAN|FANS|FARM|FARMERS|FASHION|FAST|FEDEX|FEEDBACK|FERRARI|FERRERO|FI|FIAT|FIDELITY|FIDO|FILM|FINAL|FINANCE|FINANCIAL|FIRE|FIRESTONE|FIRMDALE|FISH|FISHING|FIT|FITNESS|FJ|FK|FLICKR|FLIGHTS|FLIR|FLORIST|FLOWERS|FLY|FM|FO|FOO|FOOD|FOODNETWORK|FOOTBALL|FORD|FOREX|FORSALE|FORUM|FOUNDATION|FOX|FR|FREE|FRESENIUS|FRL|FROGANS|FRONTDOOR|FRONTIER|FTR|FUJITSU|FUJIXEROX|FUN|FUND|FURNITURE|FUTBOL|FYI|GA|GAL|GALLERY|GALLO|GALLUP|GAME|GAMES|GAP|GARDEN|GAY|GB|GBIZ|GD|GDN|GE|GEA|GENT|GENTING|GEORGE|GF|GG|GGEE|GH|GI|GIFT|GIFTS|GIVES|GIVING|GL|GLADE|GLASS|GLE|GLOBAL|GLOBO|GM|GMAIL|GMBH|GMO|GMX|GN|GODADDY|GOLD|GOLDPOINT|GOLF|GOO|GOODYEAR|GOOG|GOOGLE|GOP|GOT|GOV|GP|GQ|GR|GRAINGER|GRAPHICS|GRATIS|GREEN|GRIPE|GROCERY|GROUP|GS|GT|GU|GUARDIAN|GUCCI|GUGE|GUIDE|GUITARS|GURU|GW|GY|HAIR|HAMBURG|HANGOUT|HAUS|HBO|HDFC|HDFCBANK|HEALTH|HEALTHCARE|HELP|HELSINKI|HERE|HERMES|HGTV|HIPHOP|HISAMITSU|HITACHI|HIV|HK|HKT|HM|HN|HOCKEY|HOLDINGS|HOLIDAY|HOMEDEPOT|HOMEGOODS|HOMES|HOMESENSE|HONDA|HORSE|HOSPITAL|HOST|HOSTING|HOT|HOTELES|HOTELS|HOTMAIL|HOUSE|HOW|HR|HSBC|HT|HU|HUGHES|HYATT|HYUNDAI|IBM|ICBC|ICE|ICU|ID|IE|IEEE|IFM|IKANO|IL|IM|IMAMAT|IMDB|IMMO|IMMOBILIEN|IN|INC|INDUSTRIES|INFINITI|INFO|ING|INK|INSTITUTE|INSURANCE|INSURE|INT|INTERNATIONAL|INTUIT|INVESTMENTS|IO|IPIRANGA|IQ|IR|IRISH|IS|ISMAILI|IST|ISTANBUL|IT|ITAU|ITV|IVECO|JAGUAR|JAVA|JCB|JE|JEEP|JETZT|JEWELRY|JIO|JLL|JM|JMP|JNJ|JO|JOBS|JOBURG|JOT|JOY|JP|JPMORGAN|JPRS|JUEGOS|JUNIPER|KAUFEN|KDDI|KE|KERRYHOTELS|KERRYLOGISTICS|KERRYPROPERTIES|KFH|KG|KH|KI|KIA|KIM|KINDER|KINDLE|KITCHEN|KIWI|KM|KN|KOELN|KOMATSU|KOSHER|KP|KPMG|KPN|KR|KRD|KRED|KUOKGROUP|KW|KY|KYOTO|KZ|LA|LACAIXA|LAMBORGHINI|LAMER|LANCASTER|LANCIA|LAND|LANDROVER|LANXESS|LASALLE|LAT|LATINO|LATROBE|LAW|LAWYER|LB|LC|LDS|LEASE|LECLERC|LEFRAK|LEGAL|LEGO|LEXUS|LGBT|LI|LIDL|LIFE|LIFEINSURANCE|LIFESTYLE|LIGHTING|LIKE|LILLY|LIMITED|LIMO|LINCOLN|LINDE|LINK|LIPSY|LIVE|LIVING|LIXIL|LK|LLC|LLP|LOAN|LOANS|LOCKER|LOCUS|LOFT|LOL|LONDON|LOTTE|LOTTO|LOVE|LPL|LPLFINANCIAL|LR|LS|LT|LTD|LTDA|LU|LUNDBECK|LUXE|LUXURY|LV|LY|MA|MACYS|MADRID|MAIF|MAISON|MAKEUP|MAN|MANAGEMENT|MANGO|MAP|MARKET|MARKETING|MARKETS|MARRIOTT|MARSHALLS|MASERATI|MATTEL|MBA|MC|MCKINSEY|MD|ME|MED|MEDIA|MEET|MELBOURNE|MEME|MEMORIAL|MEN|MENU|MERCKMSD|MG|MH|MIAMI|MICROSOFT|MIL|MINI|MINT|MIT|MITSUBISHI|MK|ML|MLB|MLS|MM|MMA|MN|MO|MOBI|MOBILE|MODA|MOE|MOI|MOM|MONASH|MONEY|MONSTER|MORMON|MORTGAGE|MOSCOW|MOTO|MOTORCYCLES|MOV|MOVIE|MP|MQ|MR|MS|MSD|MT|MTN|MTR|MU|MUSEUM|MUTUAL|MV|MW|MX|MY|MZ|NA|NAB|NAGOYA|NAME|NATIONWIDE|NATURA|NAVY|NBA|NC|NE|NEC|NET|NETBANK|NETFLIX|NETWORK|NEUSTAR|NEW|NEWS|NEXT|NEXTDIRECT|NEXUS|NF|NFL|NG|NGO|NHK|NI|NICO|NIKE|NIKON|NINJA|NISSAN|NISSAY|NL|NO|NOKIA|NORTHWESTERNMUTUAL|NORTON|NOW|NOWRUZ|NOWTV|NP|NR|NRA|NRW|NTT|NU|NYC|NZ|OBI|OBSERVER|OFF|OFFICE|OKINAWA|OLAYAN|OLAYANGROUP|OLDNAVY|OLLO|OM|OMEGA|ONE|ONG|ONL|ONLINE|ONYOURSIDE|OOO|OPEN|ORACLE|ORANGE|ORG|ORGANIC|ORIGINS|OSAKA|OTSUKA|OTT|OVH|PA|PAGE|PANASONIC|PARIS|PARS|PARTNERS|PARTS|PARTY|PASSAGENS|PAY|PCCW|PE|PET|PF|PFIZER|PG|PH|PHARMACY|PHD|PHILIPS|PHONE|PHOTO|PHOTOGRAPHY|PHOTOS|PHYSIO|PICS|PICTET|PICTURES|PID|PIN|PING|PINK|PIONEER|PIZZA|PK|PL|PLACE|PLAY|PLAYSTATION|PLUMBING|PLUS|PM|PN|PNC|POHL|POKER|POLITIE|PORN|POST|PR|PRAMERICA|PRAXI|PRESS|PRIME|PRO|PROD|PRODUCTIONS|PROF|PROGRESSIVE|PROMO|PROPERTIES|PROPERTY|PROTECTION|PRU|PRUDENTIAL|PS|PT|PUB|PW|PWC|PY|QA|QPON|QUEBEC|QUEST|QVC|RACING|RADIO|RAID|RE|READ|REALESTATE|REALTOR|REALTY|RECIPES|RED|REDSTONE|REDUMBRELLA|REHAB|REISE|REISEN|REIT|RELIANCE|REN|RENT|RENTALS|REPAIR|REPORT|REPUBLICAN|REST|RESTAURANT|REVIEW|REVIEWS|REXROTH|RICH|RICHARDLI|RICOH|RIL|RIO|RIP|RMIT|RO|ROCHER|ROCKS|RODEO|ROGERS|ROOM|RS|RSVP|RU|RUGBY|RUHR|RUN|RW|RWE|RYUKYU|SA|SAARLAND|SAFE|SAFETY|SAKURA|SALE|SALON|SAMSCLUB|SAMSUNG|SANDVIK|SANDVIKCOROMANT|SANOFI|SAP|SARL|SAS|SAVE|SAXO|SB|SBI|SBS|SC|SCA|SCB|SCHAEFFLER|SCHMIDT|SCHOLARSHIPS|SCHOOL|SCHULE|SCHWARZ|SCIENCE|SCJOHNSON|SCOT|SD|SE|SEARCH|SEAT|SECURE|SECURITY|SEEK|SELECT|SENER|SERVICES|SES|SEVEN|SEW|SEX|SEXY|SFR|SG|SH|SHANGRILA|SHARP|SHAW|SHELL|SHIA|SHIKSHA|SHOES|SHOP|SHOPPING|SHOUJI|SHOW|SHOWTIME|SI|SILK|SINA|SINGLES|SITE|SJ|SK|SKI|SKIN|SKY|SKYPE|SL|SLING|SM|SMART|SMILE|SN|SNCF|SO|SOCCER|SOCIAL|SOFTBANK|SOFTWARE|SOHU|SOLAR|SOLUTIONS|SONG|SONY|SOY|SPA|SPACE|SPORT|SPOT|SPREADBETTING|SR|SRL|SS|ST|STADA|STAPLES|STAR|STATEBANK|STATEFARM|STC|STCGROUP|STOCKHOLM|STORAGE|STORE|STREAM|STUDIO|STUDY|STYLE|SU|SUCKS|SUPPLIES|SUPPLY|SUPPORT|SURF|SURGERY|SUZUKI|SV|SWATCH|SWIFTCOVER|SWISS|SX|SY|SYDNEY|SYSTEMS|SZ|TAB|TAIPEI|TALK|TAOBAO|TARGET|TATAMOTORS|TATAR|TATTOO|TAX|TAXI|TC|TCI|TD|TDK|TEAM|TECH|TECHNOLOGY|TEL|TEMASEK|TENNIS|TEVA|TF|TG|TH|THD|THEATER|THEATRE|TIAA|TICKETS|TIENDA|TIFFANY|TIPS|TIRES|TIROL|TJ|TJMAXX|TJX|TK|TKMAXX|TL|TM|TMALL|TN|TO|TODAY|TOKYO|TOOLS|TOP|TORAY|TOSHIBA|TOTAL|TOURS|TOWN|TOYOTA|TOYS|TR|TRADE|TRADING|TRAINING|TRAVEL|TRAVELCHANNEL|TRAVELERS|TRAVELERSINSURANCE|TRUST|TRV|TT|TUBE|TUI|TUNES|TUSHU|TV|TVS|TW|TZ|UA|UBANK|UBS|UG|UK|UNICOM|UNIVERSITY|UNO|UOL|UPS|US|UY|UZ|VA|VACATIONS|VANA|VANGUARD|VC|VE|VEGAS|VENTURES|VERISIGN|VERSICHERUNG|VET|VG|VI|VIAJES|VIDEO|VIG|VIKING|VILLAS|VIN|VIP|VIRGIN|VISA|VISION|VIVA|VIVO|VLAANDEREN|VN|VODKA|VOLKSWAGEN|VOLVO|VOTE|VOTING|VOTO|VOYAGE|VU|VUELOS|WALES|WALMART|WALTER|WANG|WANGGOU|WATCH|WATCHES|WEATHER|WEATHERCHANNEL|WEBCAM|WEBER|WEBSITE|WED|WEDDING|WEIBO|WEIR|WF|WHOSWHO|WIEN|WIKI|WILLIAMHILL|WIN|WINDOWS|WINE|WINNERS|WME|WOLTERSKLUWER|WOODSIDE|WORK|WORKS|WORLD|WOW|WS|WTC|WTF|XBOX|XEROX|XFINITY|XIHUAN|XIN|XN--11B4C3D|XN--1CK2E1B|XN--1QQW23A|XN--2SCRJ9C|XN--30RR7Y|XN--3BST00M|XN--3DS443G|XN--3E0B707E|XN--3HCRJ9C|XN--3OQ18VL8PN36A|XN--3PXU8K|XN--42C2D9A|XN--45BR5CYL|XN--45BRJ9C|XN--45Q11C|XN--4DBRK0CE|XN--4GBRIM|XN--54B7FTA0CC|XN--55QW42G|XN--55QX5D|XN--5SU34J936BGSG|XN--5TZM5G|XN--6FRZ82G|XN--6QQ986B3XL|XN--80ADXHKS|XN--80AO21A|XN--80AQECDR1A|XN--80ASEHDB|XN--80ASWG|XN--8Y0A063A|XN--90A3AC|XN--90AE|XN--90AIS|XN--9DBQ2A|XN--9ET52U|XN--9KRT00A|XN--B4W605FERD|XN--BCK1B9A5DRE4C|XN--C1AVG|XN--C2BR7G|XN--CCK2B3B|XN--CCKWCXETD|XN--CG4BKI|XN--CLCHC0EA0B2G2A9GCD|XN--CZR694B|XN--CZRS0T|XN--CZRU2D|XN--D1ACJ3B|XN--D1ALF|XN--E1A4C|XN--ECKVDTC9D|XN--EFVY88H|XN--FCT429K|XN--FHBEI|XN--FIQ228C5HS|XN--FIQ64B|XN--FIQS8S|XN--FIQZ9S|XN--FJQ720A|XN--FLW351E|XN--FPCRJ9C3D|XN--FZC2C9E2C|XN--FZYS8D69UVGM|XN--G2XX48C|XN--GCKR3F0F|XN--GECRJ9C|XN--GK3AT1E|XN--H2BREG3EVE|XN--H2BRJ9C|XN--H2BRJ9C8C|XN--HXT814E|XN--I1B6B1A6A2E|XN--IMR513N|XN--IO0A7I|XN--J1AEF|XN--J1AMH|XN--J6W193G|XN--JLQ480N2RG|XN--JLQ61U9W7B|XN--JVR189M|XN--KCRX77D1X4A|XN--KPRW13D|XN--KPRY57D|XN--KPUT3I|XN--L1ACC|XN--LGBBAT1AD8J|XN--MGB9AWBF|XN--MGBA3A3EJT|XN--MGBA3A4F16A|XN--MGBA7C0BBN0A|XN--MGBAAKC7DVF|XN--MGBAAM7A8H|XN--MGBAB2BD|XN--MGBAH1A3HJKRD|XN--MGBAI9AZGQP6J|XN--MGBAYH7GPA|XN--MGBBH1A|XN--MGBBH1A71E|XN--MGBC0A9AZCG|XN--MGBCA7DZDO|XN--MGBCPQ6GPA1A|XN--MGBERP4A5D4AR|XN--MGBGU82A|XN--MGBI4ECEXP|XN--MGBPL2FH|XN--MGBT3DHD|XN--MGBTX2B|XN--MGBX4CD0AB|XN--MIX891F|XN--MK1BU44C|XN--MXTQ1M|XN--NGBC5AZD|XN--NGBE9E0A|XN--NGBRX|XN--NODE|XN--NQV7F|XN--NQV7FS00EMA|XN--NYQY26A|XN--O3CW4H|XN--OGBPF8FL|XN--OTU796D|XN--P1ACF|XN--P1AI|XN--PGBS0DH|XN--PSSY2U|XN--Q7CE6A|XN--Q9JYB4C|XN--QCKA1PMC|XN--QXA6A|XN--QXAM|XN--RHQV96G|XN--ROVU88B|XN--RVC1E0AM3E|XN--S9BRJ9C|XN--SES554G|XN--T60B56A|XN--TCKWE|XN--TIQ49XQYJ|XN--UNUP4Y|XN--VERMGENSBERATER-CTB|XN--VERMGENSBERATUNG-PWB|XN--VHQUV|XN--VUQ861B|XN--W4R85EL8FHU5DNRA|XN--W4RS40L|XN--WGBH1C|XN--WGBL6A|XN--XHQ521B|XN--XKC2AL3HYE2A|XN--XKC2DL3A5EE0H|XN--Y9A3AQ|XN--YFRO4I67O|XN--YGBI2AMMX|XN--ZFR164B|XXX|XYZ|YACHTS|YAHOO|YAMAXUN|YANDEX|YE|YODOBASHI|YOGA|YOKOHAMA|YOU|YOUTUBE|YT|YUN|ZA|ZAPPOS|ZARA|ZERO|ZIP|ZM|ZONE|ZUERICH|ZW)$/i;

// src/rate-limit.ts
function createRateLimitChecker(options) {
  let {maxRequestsPerPeriod, periodInMinutes, sites} = options;
  options = {maxRequestsPerPeriod: 10, periodInMinutes: 1, sites: [], ...options};
  let hostPatternRegExps = [];
  sites && sites.forEach((host) => {
    host = host.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d").replace(/\\\*/g, "[\\s\\S]*");
    let regexp = new RegExp(`^${host}(?![A-Za-z0-9])`, "i");
    hostPatternRegExps.push(regexp);
  });
  let accessedHosts = new Map();
  setInterval(() => {
    accessedHosts.clear();
  }, options.periodInMinutes * 6e4);
  let rateLimitMessage = `The number of requests is limited to ${maxRequestsPerPeriod}
    ${periodInMinutes === 1 ? " per minute" : " per " + periodInMinutes + " minutes"}. 
    Please self-host CORS Anywhere IFrame if you need more quota.`;
  return function(origin) {
    let host = origin.replace(/^[\w\-]+:\/\//i, "");
    if (!(hostPatternRegExps && hostPatternRegExps.some((hostPattern) => hostPattern.test(host))))
      if (!accessedHosts.has(host))
        accessedHosts.set(host, 1);
      else {
        let count = accessedHosts.get(host) + 1;
        if (count > maxRequestsPerPeriod)
          return rateLimitMessage;
        accessedHosts.set(host, count);
      }
  };
}

// src/cors-anywhere-iframe.ts
var import_proxy_from_env = __toModule(require("proxy-from-env")), import_url = __toModule(require("url")), import_fs = __toModule(require("fs")), import_zlib = __toModule(require("zlib")), import_util = __toModule(require("util")), help_text = {};
function showUsage(help_file, headers, response) {
  let isHtml = /\.html$/.test(help_file);
  headers["content-type"] = isHtml ? "text/html" : "text/plain", help_text[help_file] != null ? (response.writeHead(200, headers), response.end(help_text[help_file])) : import_fs.default.readFile(help_file, "utf8", (err, data) => {
    err ? (console.error(err), response.writeHead(500, headers), response.end()) : (help_text[help_file] = data, showUsage(help_file, headers, response));
  });
}
function isValidHostName(hostname) {
  return !!(regexp_top_level_domain_default.test(hostname) || import_net.isIPv4(hostname) || import_net.isIPv6(hostname));
}
function withCORS(headers, request) {
  headers["access-control-allow-origin"] = "*";
  let corsMaxAge = request.corsAnywhereRequestState.corsMaxAge;
  return request.method === "OPTIONS" && corsMaxAge && (headers["access-control-max-age"] = corsMaxAge), request.headers["access-control-request-method"] && (headers["access-control-allow-methods"] = request.headers["access-control-request-method"], delete request.headers["access-control-request-method"]), request.headers["access-control-request-headers"] && (headers["access-control-allow-headers"] = request.headers["access-control-request-headers"], delete request.headers["access-control-request-headers"]), headers["access-control-expose-headers"] = Object.keys(headers).join(","), headers;
}
function proxyRequest(req, res, proxy) {
  let location = req.corsAnywhereRequestState.location;
  req.url = location.pathname;
  let proxyOptions = {
    changeOrigin: !1,
    prependPath: !1,
    target: location,
    headers: {
      host: location.host
    },
    buffer: {
      pipe: (proxyReq) => {
        let proxyReqOn = proxyReq.on;
        return proxyReq.on = (eventName, listener) => eventName !== "response" ? proxyReqOn.call(proxyReq, eventName, listener) : proxyReqOn.call(proxyReq, "response", (proxyRes) => {
          if (onProxyResponse(proxy, proxyReq, proxyRes, req, res))
            try {
              listener(proxyRes);
            } catch (err) {
              proxyReq.emit("error", err);
            }
        }), req.pipe(proxyReq);
      }
    }
  }, proxyThroughUrl = req.corsAnywhereRequestState.getProxyForUrl(location.href);
  proxyThroughUrl && (proxyOptions.target = proxyThroughUrl, req.url = location.href);
  try {
    proxy.web(req, res, proxyOptions);
  } catch (err) {
    proxy.emit("error", err, req, res);
  }
}
var textDecoder = new import_util.TextDecoder();
function modifyBody(body, contentEncoding, origin) {
  let rawBody;
  return contentEncoding === "gzip" ? rawBody = textDecoder.decode(import_zlib.default.gunzipSync(body)) : contentEncoding === "deflate" ? rawBody = textDecoder.decode(import_zlib.default.inflateSync(body)) : contentEncoding === "br" ? rawBody = textDecoder.decode(import_zlib.default.brotliDecompressSync(body)) : rawBody = textDecoder.decode(body), rawBody = rawBody.replace(/<head([^>]*)>/i, `<head$1><base href="${origin}">`), contentEncoding === "gzip" ? body = import_zlib.default.gzipSync(rawBody) : contentEncoding === "deflate" ? body = import_zlib.default.deflateSync(rawBody) : contentEncoding === "br" ? body = import_zlib.default.brotliCompressSync(rawBody) : body = Buffer.from(rawBody), body;
}
function onProxyResponse(proxy, proxyReq, proxyRes, req, res) {
  let requestState = req.corsAnywhereRequestState, statusCode = proxyRes.statusCode;
  if (requestState.redirectCount || res.setHeader("x-request-url", requestState.location.href), statusCode === 301 || statusCode === 302 || statusCode === 303 || statusCode === 307 || statusCode === 308) {
    let locationHeader = proxyRes.headers.location, parsedLocation;
    if (locationHeader && (parsedLocation = parseURL(new import_url.URL(locationHeader, requestState.location.href).href)), parsedLocation) {
      if ((statusCode === 301 || statusCode === 302 || statusCode === 303) && (requestState.redirectCount = requestState.redirectCount + 1 || 1, requestState.redirectCount <= requestState.maxRedirects))
        return res.setHeader("X-CORS-Redirect-" + requestState.redirectCount, statusCode + " " + locationHeader), req.method = "GET", req.headers["content-length"] = "0", delete req.headers["content-type"], requestState.location = parsedLocation, req.removeAllListeners(), proxyReq.removeAllListeners("error"), proxyReq.once("error", () => {
        }), proxyReq.abort(), proxyRequest(req, res, proxy), !1;
      proxyRes.headers.location = requestState.proxyBaseUrl + "/" + locationHeader;
    }
  }
  delete proxyRes.headers["x-frame-options"], proxyRes.headers["content-security-policy"] && (proxyRes.headers["content-security-policy"] = proxyRes.headers["content-security-policy"].replace(/frame-ancestor.+?(?=;).\s?/g, "").replace(/base-uri.+?(?=;).\s?/g, `base-uri ${requestState.location.href}`).replace(/'self'/g, requestState.location.href).replace(/script-src([^;]*);/i, `script-src$1 ${requestState.proxyBaseUrl};`)), proxyRes.headers["x-final-url"] = requestState.location.href, withCORS(proxyRes.headers, req);
  let buffers = [], reason, headersSet = !1, original = patch(res, {
    writeHead(statusCode2, reasonPhrase, headers) {
      typeof reasonPhrase == "object" && (headers = reasonPhrase, reasonPhrase = void 0), res.statusCode = statusCode2, reason = reasonPhrase;
      for (let name in headers)
        res.setHeader(name, headers[name]);
      headersSet = !0, res.writeHead = original.writeHead;
    },
    write(chunk) {
      !headersSet && res.writeHead(res.statusCode), chunk && buffers.push(Buffer.from(chunk));
    },
    end(chunk) {
      !headersSet && res.writeHead(res.statusCode), chunk && buffers.push(Buffer.from(chunk));
      let body = Buffer.concat(buffers), tampered = modifyBody(body, res.getHeader("content-encoding"), requestState.location.href);
      Promise.resolve(tampered).then((body2) => {
        res.write = original.write, res.end = original.end, res.setHeader("Content-Length", Buffer.byteLength(body2)), res.writeHead(res.statusCode, reason), res.end(body2);
      });
    }
  });
  return !0;
}
function patch(obj, properties) {
  let old = {};
  for (let name in properties)
    old[name] = obj[name], obj[name] = properties[name];
  return old;
}
function parseURL(req_url) {
  let match = req_url.match(/^(?:(https?:)?\/\/)?(([^\/?]+?)(?::(\d{0,5})(?=[\/?]|$))?)([\/?][\S\s]*|$)/i);
  if (!match)
    return null;
  if (!match[1]) {
    if (/^https?:/i.test(req_url))
      return null;
    req_url.lastIndexOf("//", 0) === -1 && (req_url = "//" + req_url), req_url = (match[4] === "443" ? "https:" : "http:") + req_url;
  }
  let parsed = new import_url.URL(req_url);
  return parsed.hostname ? parsed : null;
}
function getHandler(options, proxy) {
  let corsAnywhere = {
    getProxyForUrl: import_proxy_from_env.getProxyForUrl,
    maxRedirects: 5,
    originBlacklist: [],
    originWhitelist: [],
    checkRateLimit: null,
    redirectSameOrigin: !1,
    requireHeader: null,
    removeHeaders: [],
    setHeaders: {},
    corsMaxAge: "0",
    helpFile: __dirname + "/help.txt"
  };
  corsAnywhere = {...corsAnywhere, ...options}, corsAnywhere.requireHeader && (!Array.isArray(corsAnywhere.requireHeader) || corsAnywhere.requireHeader.length === 0 ? corsAnywhere.requireHeader = null : corsAnywhere.requireHeader = corsAnywhere.requireHeader.map((headerName) => headerName.toLowerCase()));
  let hasRequiredHeaders = (headers) => !corsAnywhere.requireHeader || corsAnywhere.requireHeader.some((headerName) => headers[headerName]);
  return (req, res) => {
    req.corsAnywhereRequestState = {
      getProxyForUrl: corsAnywhere.getProxyForUrl,
      maxRedirects: corsAnywhere.maxRedirects,
      corsMaxAge: corsAnywhere.corsMaxAge
    };
    let cors_headers = withCORS({}, req);
    if (req.method === "OPTIONS") {
      res.writeHead(200, cors_headers), res.end();
      return;
    }
    let location = parseURL(req.url);
    if (!location) {
      showUsage(corsAnywhere.helpFile, cors_headers, res);
      return;
    }
    if (parseInt(location.port) > 65535) {
      res.writeHead(400, "Invalid port", cors_headers), res.end("Port number too large: " + location.port);
      return;
    }
    if (!/^\/https?:/.test(req.url) && !isValidHostName(location.hostname)) {
      res.writeHead(404, "Invalid host", cors_headers), res.end("Invalid host: " + location.hostname);
      return;
    }
    if (!hasRequiredHeaders(req.headers)) {
      res.writeHead(400, "Header required", cors_headers), res.end("Missing required request header. Must specify one of: " + corsAnywhere.requireHeader);
      return;
    }
    let origin = req.headers.origin || "";
    if (corsAnywhere.originBlacklist.indexOf(origin) >= 0) {
      res.writeHead(403, "Forbidden", cors_headers), res.end('The origin "' + origin + '" was blacklisted by the operator of this proxy.');
      return;
    }
    if (corsAnywhere.originWhitelist.length && corsAnywhere.originWhitelist.indexOf(origin) === -1) {
      res.writeHead(403, "Forbidden", cors_headers), res.end('The origin "' + origin + '" was not whitelisted by the operator of this proxy.');
      return;
    }
    let rateLimitMessage = corsAnywhere.checkRateLimit && corsAnywhere.checkRateLimit(origin);
    if (rateLimitMessage) {
      res.writeHead(429, "Too Many Requests", cors_headers), res.end('The origin "' + origin + `" has sent too many requests.
` + rateLimitMessage);
      return;
    }
    if (corsAnywhere.redirectSameOrigin && origin && location.href[origin.length] === "/" && location.href.lastIndexOf(origin, 0) === 0) {
      cors_headers.vary = "origin", cors_headers["cache-control"] = "private", cors_headers.location = location.href, res.writeHead(301, "Please use a direct request", cors_headers), res.end();
      return;
    }
    let proxyBaseUrl = (/^\s*https/.test(req["x-forwarded-proto"]) ? "https://" : "http://") + req.headers.host;
    corsAnywhere.removeHeaders.forEach((header) => delete req.headers[header]), Object.keys(corsAnywhere.setHeaders).forEach((header) => req.headers[header] = corsAnywhere.setHeaders[header]), req.corsAnywhereRequestState.location = location, req.corsAnywhereRequestState.proxyBaseUrl = proxyBaseUrl, proxyRequest(req, res, proxy);
  };
}
var createRateLimitChecker2 = createRateLimitChecker;
