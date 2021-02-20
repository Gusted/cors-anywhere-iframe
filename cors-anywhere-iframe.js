"use strict"
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  if (module2 && module2.__esModule)
    return module2;
  return __exportStar(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", {value: module2, enumerable: true})), module2);
};

// src/cors-anywhere-iframe.ts
__markAsModule(exports);
__export(exports, {
  createRateLimitChecker: () => createRateLimitChecker2,
  getHandler: () => getHandler
});
var import_net = __toModule(require("net"));

// src/regexp-top-level-domain.ts
var regexp_top_level_domain_default = /\.(?:AAA|AARP|ABARTH|ABB|ABBOTT|ABBVIE|ABC|ABLE|ABOGADO|ABUDHABI|AC|ACADEMY|ACCENTURE|ACCOUNTANT|ACCOUNTANTS|ACO|ACTIVE|ACTOR|AD|ADAC|ADS|ADULT|AE|AEG|AERO|AETNA|AF|AFAMILYCOMPANY|AFL|AFRICA|AG|AGAKHAN|AGENCY|AI|AIG|AIGO|AIRBUS|AIRFORCE|AIRTEL|AKDN|AL|ALFAROMEO|ALIBABA|ALIPAY|ALLFINANZ|ALLSTATE|ALLY|ALSACE|ALSTOM|AM|AMERICANEXPRESS|AMERICANFAMILY|AMEX|AMFAM|AMICA|AMSTERDAM|ANALYTICS|ANDROID|ANQUAN|ANZ|AO|AOL|APARTMENTS|APP|APPLE|AQ|AQUARELLE|AR|ARAB|ARAMCO|ARCHI|ARMY|ARPA|ART|ARTE|AS|ASDA|ASIA|ASSOCIATES|AT|ATHLETA|ATTORNEY|AU|AUCTION|AUDI|AUDIBLE|AUDIO|AUSPOST|AUTHOR|AUTO|AUTOS|AVIANCA|AW|AWS|AX|AXA|AZ|AZURE|BA|BABY|BAIDU|BANAMEX|BANANAREPUBLIC|BAND|BANK|BAR|BARCELONA|BARCLAYCARD|BARCLAYS|BAREFOOT|BARGAINS|BASEBALL|BASKETBALL|BAUHAUS|BAYERN|BB|BBC|BBT|BBVA|BCG|BCN|BD|BE|BEATS|BEAUTY|BEER|BENTLEY|BERLIN|BEST|BESTBUY|BET|BF|BG|BH|BHARTI|BI|BIBLE|BID|BIKE|BING|BINGO|BIO|BIZ|BJ|BLACK|BLACKFRIDAY|BLANCO|BLOCKBUSTER|BLOG|BLOOMBERG|BLUE|BM|BMS|BMW|BN|BNL|BNPPARIBAS|BO|BOATS|BOEHRINGER|BOFA|BOM|BOND|BOO|BOOK|BOOKING|BOOTS|BOSCH|BOSTIK|BOSTON|BOT|BOUTIQUE|BOX|BR|BRADESCO|BRIDGESTONE|BROADWAY|BROKER|BROTHER|BRUSSELS|BS|BT|BUDAPEST|BUGATTI|BUILD|BUILDERS|BUSINESS|BUY|BUZZ|BV|BW|BY|BZ|BZH|CA|CAB|CAFE|CAL|CALL|CALVINKLEIN|CAM|CAMERA|CAMP|CANCERRESEARCH|CANON|CAPETOWN|CAPITAL|CAPITALONE|CAR|CARAVAN|CARDS|CARE|CAREER|CAREERS|CARS|CARTIER|CASA|CASE|CASEIH|CASH|CASINO|CAT|CATERING|CATHOLIC|CBA|CBN|CBRE|CBS|CC|CD|CEB|CENTER|CEO|CERN|CF|CFA|CFD|CG|CH|CHANEL|CHANNEL|CHASE|CHAT|CHEAP|CHINTAI|CHRISTMAS|CHROME|CHRYSLER|CHURCH|CI|CIPRIANI|CIRCLE|CISCO|CITADEL|CITI|CITIC|CITY|CITYEATS|CK|CL|CLAIMS|CLEANING|CLICK|CLINIC|CLINIQUE|CLOTHING|CLOUD|CLUB|CLUBMED|CM|CN|CO|COACH|CODES|COFFEE|COLLEGE|COLOGNE|COM|COMCAST|COMMBANK|COMMUNITY|COMPANY|COMPARE|COMPUTER|COMSEC|CONDOS|CONSTRUCTION|CONSULTING|CONTACT|CONTRACTORS|COOKING|COOKINGCHANNEL|COOL|COOP|CORSICA|COUNTRY|COUPON|COUPONS|COURSES|CR|CREDIT|CREDITCARD|CREDITUNION|CRICKET|CROWN|CRS|CRUISE|CRUISES|CSC|CU|CUISINELLA|CV|CW|CX|CY|CYMRU|CYOU|CZ|DABUR|DAD|DANCE|DATA|DATE|DATING|DATSUN|DAY|DCLK|DDS|DE|DEAL|DEALER|DEALS|DEGREE|DELIVERY|DELL|DELOITTE|DELTA|DEMOCRAT|DENTAL|DENTIST|DESI|DESIGN|DEV|DHL|DIAMONDS|DIET|DIGITAL|DIRECT|DIRECTORY|DISCOUNT|DISCOVER|DISH|DIY|DJ|DK|DM|DNP|DO|DOCS|DOCTOR|DODGE|DOG|DOHA|DOMAINS|DOT|DOWNLOAD|DRIVE|DTV|DUBAI|DUCK|DUNLOP|DUNS|DUPONT|DURBAN|DVAG|DVR|DZ|EARTH|EAT|EC|ECO|EDEKA|EDU|EDUCATION|EE|EG|EMAIL|EMERCK|ENERGY|ENGINEER|ENGINEERING|ENTERPRISES|EPOST|EPSON|EQUIPMENT|ER|ERICSSON|ERNI|ES|ESQ|ESTATE|ESURANCE|ET|ETISALAT|EU|EUROVISION|EUS|EVENTS|EVERBANK|EXCHANGE|EXPERT|EXPOSED|EXPRESS|EXTRASPACE|FAGE|FAIL|FAIRWINDS|FAITH|FAMILY|FAN|FANS|FARM|FARMERS|FASHION|FAST|FEDEX|FEEDBACK|FERRARI|FERRERO|FI|FIAT|FIDELITY|FIDO|FILM|FINAL|FINANCE|FINANCIAL|FIRE|FIRESTONE|FIRMDALE|FISH|FISHING|FIT|FITNESS|FJ|FK|FLICKR|FLIGHTS|FLIR|FLORIST|FLOWERS|FLY|FM|FO|FOO|FOOD|FOODNETWORK|FOOTBALL|FORD|FOREX|FORSALE|FORUM|FOUNDATION|FOX|FR|FREE|FRESENIUS|FRL|FROGANS|FRONTDOOR|FRONTIER|FTR|FUJITSU|FUJIXEROX|FUN|FUND|FURNITURE|FUTBOL|FYI|GA|GAL|GALLERY|GALLO|GALLUP|GAME|GAMES|GAP|GARDEN|GB|GBIZ|GD|GDN|GE|GEA|GENT|GENTING|GEORGE|GF|GG|GGEE|GH|GI|GIFT|GIFTS|GIVES|GIVING|GL|GLADE|GLASS|GLE|GLOBAL|GLOBO|GM|GMAIL|GMBH|GMO|GMX|GN|GODADDY|GOLD|GOLDPOINT|GOLF|GOO|GOODHANDS|GOODYEAR|GOOG|GOOGLE|GOP|GOT|GOV|GP|GQ|GR|GRAINGER|GRAPHICS|GRATIS|GREEN|GRIPE|GROCERY|GROUP|GS|GT|GU|GUARDIAN|GUCCI|GUGE|GUIDE|GUITARS|GURU|GW|GY|HAIR|HAMBURG|HANGOUT|HAUS|HBO|HDFC|HDFCBANK|HEALTH|HEALTHCARE|HELP|HELSINKI|HERE|HERMES|HGTV|HIPHOP|HISAMITSU|HITACHI|HIV|HK|HKT|HM|HN|HOCKEY|HOLDINGS|HOLIDAY|HOMEDEPOT|HOMEGOODS|HOMES|HOMESENSE|HONDA|HONEYWELL|HORSE|HOSPITAL|HOST|HOSTING|HOT|HOTELES|HOTELS|HOTMAIL|HOUSE|HOW|HR|HSBC|HT|HU|HUGHES|HYATT|HYUNDAI|IBM|ICBC|ICE|ICU|ID|IE|IEEE|IFM|IKANO|IL|IM|IMAMAT|IMDB|IMMO|IMMOBILIEN|IN|INDUSTRIES|INFINITI|INFO|ING|INK|INSTITUTE|INSURANCE|INSURE|INT|INTEL|INTERNATIONAL|INTUIT|INVESTMENTS|IO|IPIRANGA|IQ|IR|IRISH|IS|ISELECT|ISMAILI|IST|ISTANBUL|IT|ITAU|ITV|IVECO|IWC|JAGUAR|JAVA|JCB|JCP|JE|JEEP|JETZT|JEWELRY|JIO|JLC|JLL|JM|JMP|JNJ|JO|JOBS|JOBURG|JOT|JOY|JP|JPMORGAN|JPRS|JUEGOS|JUNIPER|KAUFEN|KDDI|KE|KERRYHOTELS|KERRYLOGISTICS|KERRYPROPERTIES|KFH|KG|KH|KI|KIA|KIM|KINDER|KINDLE|KITCHEN|KIWI|KM|KN|KOELN|KOMATSU|KOSHER|KP|KPMG|KPN|KR|KRD|KRED|KUOKGROUP|KW|KY|KYOTO|KZ|LA|LACAIXA|LADBROKES|LAMBORGHINI|LAMER|LANCASTER|LANCIA|LANCOME|LAND|LANDROVER|LANXESS|LASALLE|LAT|LATINO|LATROBE|LAW|LAWYER|LB|LC|LDS|LEASE|LECLERC|LEFRAK|LEGAL|LEGO|LEXUS|LGBT|LI|LIAISON|LIDL|LIFE|LIFEINSURANCE|LIFESTYLE|LIGHTING|LIKE|LILLY|LIMITED|LIMO|LINCOLN|LINDE|LINK|LIPSY|LIVE|LIVING|LIXIL|LK|LOAN|LOANS|LOCKER|LOCUS|LOFT|LOL|LONDON|LOTTE|LOTTO|LOVE|LPL|LPLFINANCIAL|LR|LS|LT|LTD|LTDA|LU|LUNDBECK|LUPIN|LUXE|LUXURY|LV|LY|MA|MACYS|MADRID|MAIF|MAISON|MAKEUP|MAN|MANAGEMENT|MANGO|MAP|MARKET|MARKETING|MARKETS|MARRIOTT|MARSHALLS|MASERATI|MATTEL|MBA|MC|MCKINSEY|MD|ME|MED|MEDIA|MEET|MELBOURNE|MEME|MEMORIAL|MEN|MENU|MEO|MERCKMSD|METLIFE|MG|MH|MIAMI|MICROSOFT|MIL|MINI|MINT|MIT|MITSUBISHI|MK|ML|MLB|MLS|MM|MMA|MN|MO|MOBI|MOBILE|MOBILY|MODA|MOE|MOI|MOM|MONASH|MONEY|MONSTER|MOPAR|MORMON|MORTGAGE|MOSCOW|MOTO|MOTORCYCLES|MOV|MOVIE|MOVISTAR|MP|MQ|MR|MS|MSD|MT|MTN|MTR|MU|MUSEUM|MUTUAL|MV|MW|MX|MY|MZ|NA|NAB|NADEX|NAGOYA|NAME|NATIONWIDE|NATURA|NAVY|NBA|NC|NE|NEC|NET|NETBANK|NETFLIX|NETWORK|NEUSTAR|NEW|NEWHOLLAND|NEWS|NEXT|NEXTDIRECT|NEXUS|NF|NFL|NG|NGO|NHK|NI|NICO|NIKE|NIKON|NINJA|NISSAN|NISSAY|NL|NO|NOKIA|NORTHWESTERNMUTUAL|NORTON|NOW|NOWRUZ|NOWTV|NP|NR|NRA|NRW|NTT|NU|NYC|NZ|OBI|OBSERVER|OFF|OFFICE|OKINAWA|OLAYAN|OLAYANGROUP|OLDNAVY|OLLO|OM|OMEGA|ONE|ONG|ONL|ONLINE|ONYOURSIDE|OOO|OPEN|ORACLE|ORANGE|ORG|ORGANIC|ORIGINS|OSAKA|OTSUKA|OTT|OVH|PA|PAGE|PANASONIC|PANERAI|PARIS|PARS|PARTNERS|PARTS|PARTY|PASSAGENS|PAY|PCCW|PE|PET|PF|PFIZER|PG|PH|PHARMACY|PHD|PHILIPS|PHONE|PHOTO|PHOTOGRAPHY|PHOTOS|PHYSIO|PIAGET|PICS|PICTET|PICTURES|PID|PIN|PING|PINK|PIONEER|PIZZA|PK|PL|PLACE|PLAY|PLAYSTATION|PLUMBING|PLUS|PM|PN|PNC|POHL|POKER|POLITIE|PORN|POST|PR|PRAMERICA|PRAXI|PRESS|PRIME|PRO|PROD|PRODUCTIONS|PROF|PROGRESSIVE|PROMO|PROPERTIES|PROPERTY|PROTECTION|PRU|PRUDENTIAL|PS|PT|PUB|PW|PWC|PY|QA|QPON|QUEBEC|QUEST|QVC|RACING|RADIO|RAID|RE|READ|REALESTATE|REALTOR|REALTY|RECIPES|RED|REDSTONE|REDUMBRELLA|REHAB|REISE|REISEN|REIT|RELIANCE|REN|RENT|RENTALS|REPAIR|REPORT|REPUBLICAN|REST|RESTAURANT|REVIEW|REVIEWS|REXROTH|RICH|RICHARDLI|RICOH|RIGHTATHOME|RIL|RIO|RIP|RMIT|RO|ROCHER|ROCKS|RODEO|ROGERS|ROOM|RS|RSVP|RU|RUGBY|RUHR|RUN|RW|RWE|RYUKYU|SA|SAARLAND|SAFE|SAFETY|SAKURA|SALE|SALON|SAMSCLUB|SAMSUNG|SANDVIK|SANDVIKCOROMANT|SANOFI|SAP|SAPO|SARL|SAS|SAVE|SAXO|SB|SBI|SBS|SC|SCA|SCB|SCHAEFFLER|SCHMIDT|SCHOLARSHIPS|SCHOOL|SCHULE|SCHWARZ|SCIENCE|SCJOHNSON|SCOR|SCOT|SD|SE|SEARCH|SEAT|SECURE|SECURITY|SEEK|SELECT|SENER|SERVICES|SES|SEVEN|SEW|SEX|SEXY|SFR|SG|SH|SHANGRILA|SHARP|SHAW|SHELL|SHIA|SHIKSHA|SHOES|SHOP|SHOPPING|SHOUJI|SHOW|SHOWTIME|SHRIRAM|SI|SILK|SINA|SINGLES|SITE|SJ|SK|SKI|SKIN|SKY|SKYPE|SL|SLING|SM|SMART|SMILE|SN|SNCF|SO|SOCCER|SOCIAL|SOFTBANK|SOFTWARE|SOHU|SOLAR|SOLUTIONS|SONG|SONY|SOY|SPACE|SPIEGEL|SPOT|SPREADBETTING|SR|SRL|SRT|ST|STADA|STAPLES|STAR|STARHUB|STATEBANK|STATEFARM|STATOIL|STC|STCGROUP|STOCKHOLM|STORAGE|STORE|STREAM|STUDIO|STUDY|STYLE|SU|SUCKS|SUPPLIES|SUPPLY|SUPPORT|SURF|SURGERY|SUZUKI|SV|SWATCH|SWIFTCOVER|SWISS|SX|SY|SYDNEY|SYMANTEC|SYSTEMS|SZ|TAB|TAIPEI|TALK|TAOBAO|TARGET|TATAMOTORS|TATAR|TATTOO|TAX|TAXI|TC|TCI|TD|TDK|TEAM|TECH|TECHNOLOGY|TEL|TELECITY|TELEFONICA|TEMASEK|TENNIS|TEVA|TF|TG|TH|THD|THEATER|THEATRE|TIAA|TICKETS|TIENDA|TIFFANY|TIPS|TIRES|TIROL|TJ|TJMAXX|TJX|TK|TKMAXX|TL|TM|TMALL|TN|TO|TODAY|TOKYO|TOOLS|TOP|TORAY|TOSHIBA|TOTAL|TOURS|TOWN|TOYOTA|TOYS|TR|TRADE|TRADING|TRAINING|TRAVEL|TRAVELCHANNEL|TRAVELERS|TRAVELERSINSURANCE|TRUST|TRV|TT|TUBE|TUI|TUNES|TUSHU|TV|TVS|TW|TZ|UA|UBANK|UBS|UCONNECT|UG|UK|UNICOM|UNIVERSITY|UNO|UOL|UPS|US|UY|UZ|VA|VACATIONS|VANA|VANGUARD|VC|VE|VEGAS|VENTURES|VERISIGN|VERSICHERUNG|VET|VG|VI|VIAJES|VIDEO|VIG|VIKING|VILLAS|VIN|VIP|VIRGIN|VISA|VISION|VISTA|VISTAPRINT|VIVA|VIVO|VLAANDEREN|VN|VODKA|VOLKSWAGEN|VOLVO|VOTE|VOTING|VOTO|VOYAGE|VU|VUELOS|WALES|WALMART|WALTER|WANG|WANGGOU|WARMAN|WATCH|WATCHES|WEATHER|WEATHERCHANNEL|WEBCAM|WEBER|WEBSITE|WED|WEDDING|WEIBO|WEIR|WF|WHOSWHO|WIEN|WIKI|WILLIAMHILL|WIN|WINDOWS|WINE|WINNERS|WME|WOLTERSKLUWER|WOODSIDE|WORK|WORKS|WORLD|WOW|WS|WTC|WTF|XBOX|XEROX|XFINITY|XIHUAN|XIN|XN--11B4C3D|XN--1CK2E1B|XN--1QQW23A|XN--2SCRJ9C|XN--30RR7Y|XN--3BST00M|XN--3DS443G|XN--3E0B707E|XN--3HCRJ9C|XN--3OQ18VL8PN36A|XN--3PXU8K|XN--42C2D9A|XN--45BR5CYL|XN--45BRJ9C|XN--45Q11C|XN--4GBRIM|XN--54B7FTA0CC|XN--55QW42G|XN--55QX5D|XN--5SU34J936BGSG|XN--5TZM5G|XN--6FRZ82G|XN--6QQ986B3XL|XN--80ADXHKS|XN--80AO21A|XN--80AQECDR1A|XN--80ASEHDB|XN--80ASWG|XN--8Y0A063A|XN--90A3AC|XN--90AE|XN--90AIS|XN--9DBQ2A|XN--9ET52U|XN--9KRT00A|XN--B4W605FERD|XN--BCK1B9A5DRE4C|XN--C1AVG|XN--C2BR7G|XN--CCK2B3B|XN--CG4BKI|XN--CLCHC0EA0B2G2A9GCD|XN--CZR694B|XN--CZRS0T|XN--CZRU2D|XN--D1ACJ3B|XN--D1ALF|XN--E1A4C|XN--ECKVDTC9D|XN--EFVY88H|XN--ESTV75G|XN--FCT429K|XN--FHBEI|XN--FIQ228C5HS|XN--FIQ64B|XN--FIQS8S|XN--FIQZ9S|XN--FJQ720A|XN--FLW351E|XN--FPCRJ9C3D|XN--FZC2C9E2C|XN--FZYS8D69UVGM|XN--G2XX48C|XN--GCKR3F0F|XN--GECRJ9C|XN--GK3AT1E|XN--H2BREG3EVE|XN--H2BRJ9C|XN--H2BRJ9C8C|XN--HXT814E|XN--I1B6B1A6A2E|XN--IMR513N|XN--IO0A7I|XN--J1AEF|XN--J1AMH|XN--J6W193G|XN--JLQ61U9W7B|XN--JVR189M|XN--KCRX77D1X4A|XN--KPRW13D|XN--KPRY57D|XN--KPU716F|XN--KPUT3I|XN--L1ACC|XN--LGBBAT1AD8J|XN--MGB9AWBF|XN--MGBA3A3EJT|XN--MGBA3A4F16A|XN--MGBA7C0BBN0A|XN--MGBAAKC7DVF|XN--MGBAAM7A8H|XN--MGBAB2BD|XN--MGBAI9AZGQP6J|XN--MGBAYH7GPA|XN--MGBB9FBPOB|XN--MGBBH1A|XN--MGBBH1A71E|XN--MGBC0A9AZCG|XN--MGBCA7DZDO|XN--MGBERP4A5D4AR|XN--MGBGU82A|XN--MGBI4ECEXP|XN--MGBPL2FH|XN--MGBT3DHD|XN--MGBTX2B|XN--MGBX4CD0AB|XN--MIX891F|XN--MK1BU44C|XN--MXTQ1M|XN--NGBC5AZD|XN--NGBE9E0A|XN--NGBRX|XN--NODE|XN--NQV7F|XN--NQV7FS00EMA|XN--NYQY26A|XN--O3CW4H|XN--OGBPF8FL|XN--P1ACF|XN--P1AI|XN--PBT977C|XN--PGBS0DH|XN--PSSY2U|XN--Q9JYB4C|XN--QCKA1PMC|XN--QXAM|XN--RHQV96G|XN--ROVU88B|XN--RVC1E0AM3E|XN--S9BRJ9C|XN--SES554G|XN--T60B56A|XN--TCKWE|XN--TIQ49XQYJ|XN--UNUP4Y|XN--VERMGENSBERATER-CTB|XN--VERMGENSBERATUNG-PWB|XN--VHQUV|XN--VUQ861B|XN--W4R85EL8FHU5DNRA|XN--W4RS40L|XN--WGBH1C|XN--WGBL6A|XN--XHQ521B|XN--XKC2AL3HYE2A|XN--XKC2DL3A5EE0H|XN--Y9A3AQ|XN--YFRO4I67O|XN--YGBI2AMMX|XN--ZFR164B|XPERIA|XXX|XYZ|YACHTS|YAHOO|YAMAXUN|YANDEX|YE|YODOBASHI|YOGA|YOKOHAMA|YOU|YOUTUBE|YT|YUN|ZA|ZAPPOS|ZARA|ZERO|ZIP|ZIPPO|ZM|ZONE|ZUERICH|ZW)$/i;

// src/rate-limit.ts
function createRateLimitChecker(options) {
  const {maxRequestsPerPeriod, periodInMinutes, sites} = options;
  if (!options) {
    return () => {
      void 0;
    };
  }
  let hostPatternRegExp = null;
  if (sites) {
    const hostPatternParts = [];
    sites.forEach((host) => {
      const startsWithSlash = host.charAt(0) === "/";
      const endsWithSlash = host.slice(-1) === "/";
      if (startsWithSlash || endsWithSlash) {
        if (host.length === 1 || !startsWithSlash || !endsWithSlash) {
          throw new Error("Invalid RateLimitOptions.");
        }
        host = host.slice(1, -1);
        new RegExp(host);
      } else {
        host = host.replace(/[$()*+.?[\\\]^{|}]/g, "\\$&");
      }
      hostPatternParts.push(host);
    });
    hostPatternRegExp = new RegExp("^(?:" + hostPatternParts.join("|") + ")$", "i");
  }
  let accessedHosts = {};
  setInterval(() => {
    accessedHosts = {};
  }, options.periodInMinutes * 6e4);
  const rateLimitMessage = `The number of requests is limited to ${maxRequestsPerPeriod}
    ${periodInMinutes === 1 ? " per minute" : " per " + periodInMinutes + " minutes"}. 
    Please self-host CORS Anywhere IFrame if you need more quota.`;
  return function checkRateLimit(origin) {
    const host = origin.replace(/^[\w\-]+:\/\//i, "");
    if (hostPatternRegExp && hostPatternRegExp.test(host)) {
      return;
    }
    let count = accessedHosts[host] || 0;
    ++count;
    if (count > maxRequestsPerPeriod) {
      return rateLimitMessage;
    }
    accessedHosts[host] = count;
  };
}

// src/cors-anywhere-iframe.ts
var import_proxy_from_env = __toModule(require("proxy-from-env"));
var import_url = __toModule(require("url"));
var import_fs = __toModule(require("fs"));
var help_text = {};
function showUsage(help_file, headers, response) {
  const isHtml = /\.html$/.test(help_file);
  headers["content-type"] = isHtml ? "text/html" : "text/plain";
  if (help_text[help_file] != null) {
    response.writeHead(200, headers);
    response.end(help_text[help_file]);
  } else {
    import_fs.default.readFile(help_file, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        response.writeHead(500, headers);
        response.end();
      } else {
        help_text[help_file] = data;
        showUsage(help_file, headers, response);
      }
    });
  }
}
function isValidHostName(hostname) {
  return !!(regexp_top_level_domain_default.test(hostname) || import_net.isIPv4(hostname) || import_net.isIPv6(hostname));
}
function withCORS(headers, request) {
  headers["access-control-allow-origin"] = "*";
  const corsMaxAge = request.corsAnywhereRequestState.corsMaxAge;
  if (request.method === "OPTIONS" && corsMaxAge) {
    headers["access-control-max-age"] = corsMaxAge;
  }
  if (request.headers["access-control-request-method"]) {
    headers["access-control-allow-methods"] = request.headers["access-control-request-method"];
    delete request.headers["access-control-request-method"];
  }
  if (request.headers["access-control-request-headers"]) {
    headers["access-control-allow-headers"] = request.headers["access-control-request-headers"];
    delete request.headers["access-control-request-headers"];
  }
  headers["access-control-expose-headers"] = Object.keys(headers).join(",");
  return headers;
}
function proxyRequest(req, res, proxy) {
  const location = req.corsAnywhereRequestState.location;
  req.url = location.pathname;
  const proxyOptions = {
    changeOrigin: false,
    prependPath: false,
    target: location,
    headers: {
      host: location.host
    },
    buffer: {
      pipe: (proxyReq) => {
        const proxyReqOn = proxyReq.on;
        proxyReq.on = (eventName, listener) => {
          if (eventName !== "response") {
            return proxyReqOn.call(proxyReq, eventName, listener);
          }
          return proxyReqOn.call(proxyReq, "response", (proxyRes) => {
            if (onProxyResponse(proxy, proxyReq, proxyRes, req, res)) {
              try {
                listener(proxyRes);
              } catch (err) {
                proxyReq.emit("error", err);
              }
            }
          });
        };
        return req.pipe(proxyReq);
      }
    }
  };
  const proxyThroughUrl = req.corsAnywhereRequestState.getProxyForUrl(location.href);
  if (proxyThroughUrl) {
    proxyOptions.target = proxyThroughUrl;
    req.url = location.href;
  }
  try {
    proxy.web(req, res, proxyOptions);
  } catch (err) {
    proxy.emit("error", err, req, res);
  }
}
function onProxyResponse(proxy, proxyReq, proxyRes, req, res) {
  const requestState = req.corsAnywhereRequestState;
  const statusCode = proxyRes.statusCode;
  if (!requestState.redirectCount) {
    res.setHeader("x-request-url", requestState.location.href);
  }
  if (statusCode === 301 || statusCode === 302 || statusCode === 303 || statusCode === 307 || statusCode === 308) {
    const locationHeader = proxyRes.headers.location;
    let parsedLocation;
    if (locationHeader) {
      parsedLocation = parseURL(new import_url.URL(locationHeader, requestState.location.href).href);
    }
    if (parsedLocation) {
      if (statusCode === 301 || statusCode === 302 || statusCode === 303) {
        requestState.redirectCount = requestState.redirectCount + 1 || 1;
        if (requestState.redirectCount <= requestState.maxRedirects) {
          res.setHeader("X-CORS-Redirect-" + requestState.redirectCount, statusCode + " " + locationHeader);
          req.method = "GET";
          req.headers["content-length"] = "0";
          delete req.headers["content-type"];
          requestState.location = parsedLocation;
          req.removeAllListeners();
          proxyReq.removeAllListeners("error");
          proxyReq.once("error", () => void 0);
          proxyReq.abort();
          proxyRequest(req, res, proxy);
          return false;
        }
      }
      proxyRes.headers.location = requestState.proxyBaseUrl + "/" + locationHeader;
    }
  }
  delete proxyRes.headers["x-frame-options"];
  delete proxyRes.headers["content-security-policy"];
  proxyRes.headers["x-final-url"] = requestState.location.href;
  withCORS(proxyRes.headers, req);
  return true;
}
function parseURL(req_url) {
  const match = req_url.match(/^(?:(https?:)?\/\/)?(([^\/?]+?)(?::(\d{0,5})(?=[\/?]|$))?)([\/?][\S\s]*|$)/i);
  if (!match) {
    return null;
  }
  if (!match[1]) {
    if (/^https?:/i.test(req_url)) {
      return null;
    }
    if (req_url.lastIndexOf("//", 0) === -1) {
      req_url = "//" + req_url;
    }
    req_url = (match[4] === "443" ? "https:" : "http:") + req_url;
  }
  const parsed = new import_url.URL(req_url);
  if (!parsed.hostname) {
    return null;
  }
  return parsed;
}
function getHandler(options, proxy) {
  let corsAnywhere = {
    getProxyForUrl: import_proxy_from_env.getProxyForUrl,
    maxRedirects: 5,
    originBlacklist: [],
    originWhitelist: [],
    checkRateLimit: null,
    redirectSameOrigin: false,
    requireHeader: null,
    removeHeaders: [],
    setHeaders: {},
    corsMaxAge: "0",
    helpFile: __dirname + "/help.txt"
  };
  corsAnywhere = {...corsAnywhere, ...options};
  if (corsAnywhere.requireHeader) {
    if (typeof corsAnywhere.requireHeader === "string") {
      corsAnywhere.requireHeader = [corsAnywhere.requireHeader.toLowerCase()];
    } else if (!Array.isArray(corsAnywhere.requireHeader) || corsAnywhere.requireHeader.length === 0) {
      corsAnywhere.requireHeader = null;
    } else {
      corsAnywhere.requireHeader = corsAnywhere.requireHeader.map((headerName) => headerName.toLowerCase());
    }
  }
  const hasRequiredHeaders = (headers) => !corsAnywhere.requireHeader || corsAnywhere.requireHeader.some((headerName) => headers[headerName]);
  return (req, res) => {
    req.corsAnywhereRequestState = {
      getProxyForUrl: corsAnywhere.getProxyForUrl,
      maxRedirects: corsAnywhere.maxRedirects,
      corsMaxAge: corsAnywhere.corsMaxAge
    };
    const cors_headers = withCORS({}, req);
    if (req.method === "OPTIONS") {
      res.writeHead(200, cors_headers);
      res.end();
      return;
    }
    const location = parseURL(req.url.slice(1));
    if (!location) {
      showUsage(corsAnywhere.helpFile, cors_headers, res);
      return;
    }
    if (location.host === "iscorsneeded") {
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.end("no");
      return;
    }
    if (parseInt(location.port) > 65535) {
      res.writeHead(400, "Invalid port", cors_headers);
      res.end("Port number too large: " + location.port);
      return;
    }
    if (!/^\/https?:/.test(req.url) && !isValidHostName(location.hostname)) {
      res.writeHead(404, "Invalid host", cors_headers);
      res.end("Invalid host: " + location.hostname);
      return;
    }
    if (!hasRequiredHeaders(req.headers)) {
      res.writeHead(400, "Header required", cors_headers);
      res.end("Missing required request header. Must specify one of: " + corsAnywhere.requireHeader);
      return;
    }
    const origin = req.headers.origin || "";
    if (corsAnywhere.originBlacklist.indexOf(origin) >= 0) {
      res.writeHead(403, "Forbidden", cors_headers);
      res.end('The origin "' + origin + '" was blacklisted by the operator of this proxy.');
      return;
    }
    if (corsAnywhere.originWhitelist.length && corsAnywhere.originWhitelist.indexOf(origin) === -1) {
      res.writeHead(403, "Forbidden", cors_headers);
      res.end('The origin "' + origin + '" was not whitelisted by the operator of this proxy.');
      return;
    }
    const rateLimitMessage = corsAnywhere.checkRateLimit && corsAnywhere.checkRateLimit(origin);
    if (rateLimitMessage) {
      res.writeHead(429, "Too Many Requests", cors_headers);
      res.end('The origin "' + origin + '" has sent too many requests.\n' + rateLimitMessage);
      return;
    }
    if (corsAnywhere.redirectSameOrigin && origin && location.href[origin.length] === "/" && location.href.lastIndexOf(origin, 0) === 0) {
      cors_headers["vary"] = "origin";
      cors_headers["cache-control"] = "private";
      cors_headers["location"] = location.href;
      res.writeHead(301, "Please use a direct request", cors_headers);
      res.end();
      return;
    }
    const isRequestedOverHttps = /^\s*https/.test(req["x-forwarded-proto"]);
    const proxyBaseUrl = (isRequestedOverHttps ? "https://" : "http://") + req.headers.host;
    corsAnywhere.removeHeaders.forEach((header) => delete req.headers[header]);
    Object.keys(corsAnywhere.setHeaders).forEach((header) => req.headers[header] = corsAnywhere.setHeaders[header]);
    req.corsAnywhereRequestState.location = location;
    req.corsAnywhereRequestState.proxyBaseUrl = proxyBaseUrl;
    proxyRequest(req, res, proxy);
  };
}
var createRateLimitChecker2 = createRateLimitChecker;
