/*****************************************************************************
 * $Id$
 * Purpose: Fusion initialization script bootstrap code
 * Project: Fusion
 * Author: DM Solutions Group Inc 
 * Copyright (c) 2007 DM Solutions Group Inc.
 *****************************************************************************
 * This code shall not be copied or used without the expressed written consent
 * of DM Solutions Group Inc.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 * 
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 *****************************************************************************/

/**
 * declare global namespace object for Jx library to use
 */
var Jx = {};

/**
 * declare global namespace object for Fusion library to use
 */
var Fusion = {};

/* set to true if you want to use the compressed version of the core files,
 * currently this saves about 100kb and quite a few HTTP connections so it is
 * faster, but less convenient if you want to debug one of the core files
 */
Fusion.useFusionLib = false;

if (Fusion.useFusionLib) {
    Fusion.coreScripts = ['jx/lib/jx_compressed.js',
                        'lib/fusion-lib.js',
                        'lib/excanvas/excanvas-compressed.js',
                        'lib/Search.js'];
} else {
    Fusion.coreScripts = ['jx/lib/jx_combined.js',
                        'lib/utils.js',
                        'lib/Error.js',
                        'lib/ConfigMgr.js',
                        'lib/WebCommand.js',
                        'lib/WebLayout.js',
                        'lib/MGBroker.js',
                        'lib/Widget.js',
                        'lib/ButtonBase.js',
                        'lib/ButtonTool.js',
                        'lib/CanvasTool.js',
                        'lib/ClickTool.js',
                        'lib/RectTool.js',
                        'lib/Map.js',
                        'lib/excanvas/excanvas-compressed.js',
                        'lib/Search.js'];
}

/* bootstrap function that gets everything Fusion needs, loaded */
Fusion.bootstrap = function() {
    var aScripts = document.getElementsByTagName('SCRIPT');
    var gszFusionURL = '';
    for (var i=0; i<aScripts.length; i++) {
        var s = aScripts[i].src;
        var n = s.indexOf('lib/fusion.js');
        if (n != -1) {
            gszFusionURL = s.substring(0,n);
            /* import the compressed version of jx and its CSS */
            Jx.baseURL = gszFusionURL + 'jx/';
            Jx.COMBINED_CSS = true;
            for (var j=0; j<Fusion.coreScripts.length; j++) {
                document.write('<script type="text/javascript" src="'+gszFusionURL+Fusion.coreScripts[j]+'"></script>');
            }
            break;
        }
    }
}    
Fusion.bootstrap();

/**
 * reverse inheritance logic to allow for delayed loading of dependencies.
 * Under normal circumstances, Object.extend from Prototype would be used,
 * but in Fusion, widget code is loaded before base class code and the
 * extend function won't work until all the base class code is available.
 */
Object.inheritFrom = function(destination, source, args) {
    for (property in source) {
        if (typeof destination[property] == 'undefined') {
            destination[property] = source[property];
        }
    }
    source.initialize.apply(destination, args);
};

/* now we can safely replace the global fusion object */
Fusion = {
    Tool: {},
    Widget: {},
    Event: {lastEventId: 0},
    Lib: {},
    Constant: {},
    /** 
     * resource ID of the WebLayout to use with this application,
     * set when Fusion is initialized
     */
    sWebLayout : "",
    //not used??
    oMapConfig : "",
    /**
     * URL to the configuration file to use for this application.  The
     * configuration file must be located on the same domain as the
     * application template.
     */
    sConfigFileURL : "",
    
    sWebAgentURL : "",
    sWebTierURL : "",
    sRedirectScript : "",  
    bForceRedirect : false,
    sScriptLang : "",
	
	/** URL to the directory from which fusion.js was loaded */
    fusionURL: null,
    
    /** 
     * configuration object that holds the server configuration as
     * loaded from fusion/config.xml
     */
	configuration: null,
    
    /* broker instance for communicating with the mapagent */
    oBroker: null,
    
    /** An array of scripts that are queued to be loaded */
    aScripts : [],
    /** An array of scripts that are currently being loaded */
    aLoadingScripts: [],
    /** The current state during initialization of the application */
    loadState: null,
 
    /** API loading has not begun */
    UNLOADED: 0,
    /** Load the configuration file for the application */
    LOAD_CONFIG: 1,
    /** Load the widget files required by the application */
    LOAD_WIDGETS: 2,
    /** Loading is complete */
    LOAD_COMPLETE: 3,
    
    /** unit related stuff */
    UNKNOWN: 0,
    INCHES: 1,
    FEET: 2,
    YARDS: 3,
    MILES: 4,
    NAUTICALMILES: 5,
    MILLIMETERS: 6,
    CENTIMETERS: 7,
    METERS: 8,
    KILOMETERS: 9,
    DEGREES: 10,
    DECIMALDEGREES: 11,
    DMS: 12,
    PIXELS: 13,
    aUnitPerMeter: [1.0, /* 0 - UNKNOWN */
                    39.37, /* 1 - INCHES */
                    3.2808, /* 2 - FEET */
                    1.0936133, /* 3 - YARDS */
                    0.00062137, /* 4 - MILES */
                    0.000539956803, /* 5 - NAUTICAL MILES */
                    1000.0, /* 6 - MILLIMETERS */
                    100.0, /* 7 - CENTIMETERS */
                    1.0, /* 8- METERS */
                    0.001, /* 9 - KILOMETERS */
                    0.000009044, /* 10 - DEGREES */
                    0.000009044, /* 11 - DECIMALDEGREES */
                    0.000009044, /* 12 - DMS */
                    1.0, /* 13 - PIXELS */
                    ],
    aMeterPerUnit: [1.0, /* 0 - UNKNOWN */
                    0.0254, /* 1 - INCHES */
                    0.3048, /* 2 - FEET */
                    0.9144, /* 3 - YARDS */
                    1609.344, /* 4 - MILES */
                    1852, /* 5 - NAUTICAL MILES */
                    0.001, /* 6 - MILLIMETERS */
                    0.01, /* 7 - CENTIMETERS */
                    1.0, /* 8- METERS */
                    1000.0, /* 9 - KILOMETERS */
                    111061.75033, /* 10 - DEGREES */
                    111061.75033, /* 11 - DECIMALDEGREES */
                    111061.75033, /* 12 - DMS */
                    1.0, /* 13 - PIXELS */],
    aUnitNames: ['Unknown','Inches', 'Feet', 'Yards', 'Miles', 'Nautical Miles',
                 'Millimeters', 'Centimeters', 'Meters', 'Kilometers', 
                 'Degrees', 'Decimal Degrees', 'Degrees Minutes Seconds', 'Pixels'],
    aUnitAbbr: ['unk', 'in', 'ft', 'yd', 'mi', 'nm', 
                'mm', 'cm', 'm', 'km', 
                '&deg;', '&deg;', '&deg;', 'px'],
    /**
     * initialize the Fusion application.
     *
     * @param serverConfig {String} a URL to the configuration file for this
     *        application
     * @param webLayout {String} a Resource ID of a WebLayout that contains
     *        the widget definitions to be used for this application
     * @param mapConfig {String} (optional) a Resource ID of a MapDefinition 
     *        to be used in place of the default MapDefinition specified
     *        in the webLayout.  If not passed, the MapDefinition specified
     *        in the webLayout will be used.
     */
    initialize : function(serverConfig, webLayout, mapConfig, sessionid) {
        this.sWebLayout = webLayout ? webLayout : 'WebLayout.xml';
        this.oMapConfig = mapConfig;
        this.sConfigFileURL = serverConfig;
        //extract from config file
        this.sWebagentURL = "";
        this.sScriptLang = "";
        this.configuration = {};

        /*if the sessionid passed as parameter is "", Fusion will create a session*/
        this.sessionID = sessionid;
        var aScripts = document.getElementsByTagName('SCRIPT');
        for (var i=0; i<aScripts.length; i++) {
            var s = aScripts[i].src;
            var n = s.indexOf('lib/fusion.js');
            if (n != -1) {
                this.fusionURL = s.substring(0,n);
                /*
                 * if the application has been loaded from the same host as
                 * fusion is installed in, then technically we don't need to
                 * use the redirect script because we conform to the 
                 * Same Origin Policy for XmlHttpRequest to work.
                 */
                var options = {};
                options.onSuccess = this.serverSet.bind(this);
                options.onFailure = this.serverFailed.bind(this);
                var test = window.location.protocol+'//'+window.location.host;
                //if (this.fusionURL.indexOf(test,0) == 0) {
                if ( ((this.fusionURL.indexOf("http://") < 0) || (this.fusionURL.indexOf(test,0) == 0)) && !(this.bForceRedirect)) {
                    this.sRedirectScript = '';
                    options.method = 'get';
                    this.ajaxRequest('config.xml', options);
                } else {
                    this.sRedirectScript = 'redirect.php';
                    this.ajaxRequest('config.xml&method=get', options);
                }
                /*script language*/
                this.sScriptLang =  'php';
alert("redirect:"+this.sRedirectScript);

                break;
            }
        }
        if (!this.fusionURL) {
            alert('failed to determine fusionURL.  Initailization aborted');
            return;
        }
    },
    /**
     * set the current initialization state of the application.
     * Depending on the state, this will cause various scripts
     * to be loaded.
     *
     * @param state {Integer} the new loading state
     */
    setLoadState: function(state) {
        //console.log('setLoadState: ' + state);
        this.loadState = state;
        switch(state) {
            case this.LOAD_CONFIG:
                // console.log('load config');
                this.loadConfig();
                break;
            case this.LOAD_WIDGETS:
                // console.log('load widgets');
                this.loadQueuedScripts();
                break;
            case this.LOAD_COMPLETE:
                // console.log('load complete');
                this.oConfigMgr.createWidgets();
                this.triggerEvent(Fusion.Event.FUSION_INITIALIZED);
                break;
        }
    },
    /**
     * load any scripts that have been queued for loading.  As the
     * scripts load, they are removed.  When all queued scripts have
     * been loaded, the load state is advanced.  If any of the loaded
     * scripts require other scripts (for inheritance), they will be
     * queued and loaded before the load state is advanced.
     */
    loadQueuedScripts: function() {
        this.aLoadingScripts = [];
        //make a separate array of what is actually being loaded to keep track
        //of them (require adds to aScripts so we can't use that array
        //directly).
        for (var i=0; i<this.aScripts.length; i++) {
            this.aLoadingScripts[i] = this.aScripts[i];
        }
        this.aScripts = [];
        //add the script elements to the DOM to cause them to load.
        for (var i=0; i<this.aLoadingScripts.length; i++) {
            document.getElementsByTagName('head')[0].appendChild(this.aLoadingScripts[i]);
        }
        
        //if IE or Safari
        this.checkLoadInterval = window.setInterval(this.checkLoadingScripts.bind(this), 500);
    },
    /**
     * Insert a new script into the loading queue.  The URL should be relative
     * to the Fusion base url.  The script will not actually be loaded until
     * loadQueuedScripts is called.
    * @param url The url of the script.
    */
    queueScript : function(url) {
        if(!document.getElementById(url) && !this.aScripts[url]) {
            var script = document.createElement('script');
            script.defer = false;
            script.type = "text/javascript";
            //TODO: test url to see if it needs to come from fusion
            script.id = url;
            script.src = this.getFusionURL() + url;
            script.onload = this.scriptLoaded.bind(this, url);
            script.onerror = this.scriptFailed.bind(this, script.src);
            this.aScripts[url] = script;
            this.aScripts.push(script);
        }
    },
    /**
     * Called when a script fails to load for some reason.
     *
     * @param url {String} the url that failed to load
     *
     * TODO: the application probably won't work if a script fails to load
     * so we need to decide how to inform the user and fail gracefully.
     */
    scriptFailed: function(url) {
        Fusion.reportError(new Fusion.Error(Fusion.Error.FATAL, 'failed to load script: ' + url));
    },
    /**
     * a script has loaded.  It is removed from the various tracking
     * arrays.  When all requested scripts have been loaded, we check
     * to see if any scripts where required by the ones just loaded.
     * If yes, then we loadQueuedScripts again, otherwise we advance
     * the load state.
     *
     * @param url {String} the url of the script that was loaded.
     */
    scriptLoaded: function(url) {
        for (var i=0; i<this.aLoadingScripts.length;i++) {
            if (this.aLoadingScripts[i].id == url) {
                this.aLoadingScripts.splice(i,1);
            }
        }
        if (this.aLoadingScripts.length == 0) {
            window.clearInterval(this.checkLoadInterval);
            if (this.aScripts.length > 0) {
                this.loadQueuedScripts();
            } else {
                this.setLoadState(this.loadState+1);
            }
        }
    },
    /**
     * check if scripts have loaded.  In IE, scripts don't seem to fire the onload
     * event.  Safari also seems to have some problems.
     */
    checkLoadingScripts: function() {
        var agt=navigator.userAgent.toLowerCase();
        for (var i=this.aLoadingScripts.length-1; i>=0; i--) {
            var s = this.aLoadingScripts[i];
            if (s.readyState == 'loaded' ||
                s.readyState == 'complete' ||
                (agt.indexOf("safari") != -1 && s.readyState == null)) {
                this.scriptLoaded(s.id);
            }
        }
    },
    /**
     * asynchronously load the web layout through the broker and config
     * manager.
     */
    loadConfig : function() {
        var mapAgentUrl = this.getConfigurationItem('mapguide', 'mapAgentUrl');
        if (mapAgentUrl) {
            this.oBroker = new Fusion.Lib.MGBroker();
            var url = mapAgentUrl;
            if (this.sRedirectScript) {
                url = this.sRedirectScript + '?s=' + url;
                this.oBroker.method = 'post';
            } else {
                this.oBroker.method = 'get';
            }
            this.oBroker.setSiteURL(url, "Anonymous", "");
        }
        this.oConfigMgr = new Fusion.Lib.ConfigMgr(this, this.sessionID);
    },
    
    /**
     * the server has returned the application configuration file that
     * contains enough information to bootstrap the application.
     *
     * @param r {Object} an XMLHttpRequest object
     *
     * TODO: error handling on failure ... if we get here, the file was
     * found but perhaps is not valid XML or is missing required
     * elements.
     */
    serverSet : function(r) {
        if (r.responseXML) {  
            var oNode = new DomNode(r.responseXML);
            
            /* General Config */
            var oGeneral = oNode.findFirstNode('General');
            if (oGeneral) {
                this.configuration.general = {};
                this.configuration.general.scriptLanguage = oGeneral.getNodeText('ScriptLanguage');
            }
            
            /* MapGuide Config */
            var oMapGuide = oNode.findFirstNode('MapGuide');
            if (oMapGuide) {
                this.configuration.mapguide = {};
                var oString = oMapGuide.getNodeText('WebTierUrl');
                /* if it is set, use it ... otherwise assume fusion is installed in
                 * the default location and compute the web tier url from that
                 */
                if (oString) {
                    var nLength = oString.length;
                    var slastChar =  oString.charAt((nLength-1));
                    if (slastChar != '/') {
                        oString = oString + "/";
                    }
                } else {
                    var idx = this.fusionURL.lastIndexOf('fusion');
                    if (idx == -1) {
                      oString = this.fusionURL + "../";   //loaded relatively from within fusion directory
                    } else {
                      oString = this.fusionURL.substring(0, idx);
                    }
                }
                this.configuration.mapguide.webTierUrl = oString;
                this.configuration.mapguide.mapAgentUrl = oString + 'mapagent/mapagent.fcgi?';
            }
            
            /* MapServer Config */
            var oMapServer = oNode.findFirstNode('MapServer');
            if (oMapServer) {
                this.configuration.mapserver = {};
                this.configuration.mapserver.cgi = oMapServer.getNodeText('MapserverCGI');
                this.configuration.mapserver.imageUrl = oMapServer.getNodeText('ImageUrl');
            }
            //trigger loading stuff ...
            this.setLoadState(this.LOAD_CONFIG);
        } else {
            //console.log('Error parsing configuration file, it is not valid XML');
            alert('Error parsing fusion configuration file, initialization aborted');
        }
    },
    
    /**
     * the application failed to load the application configuration file.
     * Not much point in continuing, but we can inform the user why this
     * happened.
     *
     * @param r {Object} the XMLHttpRequest object
     *
     * TODO: do something more useful in here.
     */
    serverFailed: function(r) {
        //console.log('error loading server configuration file');
        alert('Error loading fusion configuration file, initialization aborted'); 
    },
    
    ajaxRequest: function(scriptURL, options) {
        //console.log('options.parameters='+options.parameters);
        var r = this.getRedirectScript();
        if (r != '') {
            r = r + '?s=';
        }
        var url = r + this.getFusionURL() + scriptURL;
        new Ajax.Request( url, options);
    },
    
    getMapByName : function(sName) {
        var map = null;
        if (this.oConfigMgr) {
            map = this.oConfigMgr.getMapByName(sName);
        }
        return map;
    },
    getMapById : function(sId) {
        var map = null;
        if (this.oConfigMgr) {
            map = this.oConfigMgr.getMapById(sId);
        }
        return map;
    },
    getMapByIndice : function(nIndice) {
        var map = null;
        if (this.oConfigMgr) {
            map = this.oConfigMgr.getMapByIndice(nIndice);
        }
        return map;
    },
    getWidgetById: function(id) {
        var widget = null;
        if (this.oConfigMgr) {
            widget = this.oConfigMgr.getWidgetById(id);
        }
        return widget;
    },
    
    getWidgetsByType: function(type) {
        var widgets = [];
        if (this.oConfigMgr) {
            widgets = this.oConfigMgr.getWidgetsByType(type);
        }
        return widgets;
    },
    
    getSearchDefinitions: function() {
        if (this.oConfigMgr) {
            return this.oConfigMgr.oWebLayout.aSearchDefinitions;
        } else {
            return {};
        }
    },
    
    getWebLayout: function() { return this.sWebLayout; },
    
    getFusionURL: function() {return this.fusionURL;},
    
    getConfigurationItem: function(arch, key) { 
        if (this.configuration[arch] && this.configuration[arch][key]) { 
            return this.configuration[arch][key]; 
        } 
        return null; 
    },
    
    getScriptLanguage: function() { return this.configuration.general.scriptLanguage; },
    
    getRedirectScript: function() { return this.sRedirectScript; },
    
    getBroker: function() { return this.oBroker; },
    
    require: function(url) { this.queueScript(url); },
    
    reportError: function(o) { this.triggerEvent(Fusion.Event.FUSION_ERROR, o); },
    
    unitFromName: function(unit) {
        switch(unit.toLowerCase()) {
            case 'unknown':
                return Fusion.UNKNOWN;
            case 'inches':
            case 'inch':
            case 'in':
                return Fusion.INCHES;
            case 'feet':
            case 'ft':
                return Fusion.FEET;
            case 'yards':
            case 'yard':
            case 'yd':
                return Fusion.YARDS;
            case 'miles':
            case 'mile':
            case 'mi':
                return Fusion.MILES;
            case 'nautical miles':
            case 'nautical mile':
            case 'nm':
                return Fusion.NAUTICALMILES;
            case 'millimeters':
            case 'millimeter':
            case 'mm':
                return Fusion.MILLIMETERS;
            case 'centimeters':
            case 'centimeter':
            case 'cm':
                return Fusion.CENTIMETERS;
            case 'meters':
            case 'meter':
            case 'm':
                return Fusion.METERS;
            case 'kilometers':
            case 'kilometer':
            case 'km':
                return Fusion.KILOMETERS;
                break;
            case 'degrees':
            case 'degree':
            case 'deg':
                return Fusion.DEGREES;
            case 'decimal degrees':
            case 'dd':
                return Fusion.DECIMALDEGREES;
            case 'degrees minutes seconds':
            case 'dms':
                return Fusion.DMS;
            case 'pixels':
            case 'pixel':
            case 'px':
                return Fusion.PIXELS;
            default:
                Fusion.UNKNOWN;
        }
    },
    
    unitName: function(unit) {
        if (unit >= Fusion.UNKNOWN && unit <= Fusion.PIXELS) {
          return (Fusion.aUnitNames[unit]);
        }
        return 'Unknown';
    },
    unitAbbr: function(unit) {
        if (unit >= Fusion.UNKNOWN && unit <= Fusion.PIXELS) {
          return (Fusion.aUnitAbbr[unit]);
        }
        return 'Unk';
    },

    toMeter: function(unit, value) {
        if (unit == Fusion.UNKNOWN) {
            return value;
        }
        if (unit > Fusion.UNKNOWN && unit < Fusion.PIXELS) {
          return (Fusion.aMeterPerUnit[unit] * value);
        }
        return false;
    },
    fromMeter: function(unit, value) {
        if (unit == Fusion.UNKNOWN) {
            return value;
        }
        if (unit > Fusion.UNKNOWN && unit < Fusion.PIXELS) {
            return (Fusion.aUnitPerMeter[unit] * value);
        }
        return false;
    },
    convert: function(unitsIn, unitsOut, value) {
        unitsIn = Fusion.toMeter(unitsIn, value);
        if (unitsIn >= Fusion.UNKNOWN && unitsIn < Fusion.PIXELS && 
            unitsOut >= Fusion.UNKNOWN && unitsOut < Fusion.PIXELS) {
            return Fusion.fromMeter(unitsOut, Fusion.toMeter(unitsIn, value));
        }
        return false;
    }
};

/**
 * Class: Event Manager
 *
 * an internal class for managing generic events.  Classes that wish to
 * publish and trigger events that other objects can listen for need to
 * inherit from Fusion.Lib.EventMgr.
 *
 * To publish an event, call registerEventID with some unique numeric or
 * string value.  Other objects can then call registerForEvent with the
 * eventID and a function to call when the event is triggered.
 *
 * To trigger an event, call triggerEvent with the eventID and any additional
 * arguments that should be passed to listeners.
 */
//Fusion.Lib.EventMgr = Class.create();
Fusion.Lib.EventMgr = {
    /* an array of eventIDs and associated listener functions */
    events : null,
    
    initialize: function() { if (!this.events) {this.events = []; }},

    /**
     * register an event ID so that others can use it.  This should really
     * only be called by 'this' object.
     *
     * @param eventID the event ID to register
     */
    registerEventID : function( eventID ) {
        var ev = new String(eventID);
        if (!this.events[eventID]) {
            this.events[eventID] = [];
        }
    },

    /**
     * register for receiving a callback when an event happens. If you
     * want the callback to be a method on an instance of some object, 
     * use the bind() function as in:
     *
     * otherObj.registerForEvent(SOME_EVENT, this.callback.bind(this));
     *
     * @param eventID the event ID to register for
     * @param f the function to call when the event happens.  
     */
    registerForEvent : function(eventID, f) {
        var ev = new String(eventID);
        this.events[eventID].push(f);
    },

    /**
     * deregister a callback function when you no longer want to
     * recieve it.  Note that if you used bind() when registering,
     * you need to pass EXACTLY THE SAME FUNCTION when
     * deregistering.  Typically, this means you need to assign the
     * result of bind() to an instance variable and pass that instance
     * variable to both registerForEvent and deregisterForEvent.
     *
     * For instance:
     *
     * this.callbackFn = this.callback.bind(this);
     * otherObj.registerForEvent(SOME_EVENT, this.callbackFn);
     * otherObj.deregisterForEvent(SOME_EVENT, this.callbackFn);
     *
     * @param eventID the event ID to deregister
     * @param f the function that used when registering.
     */
    deregisterForEvent : function( eventID, f ) {
        var ev = new String(eventID);
        var bResult = false;
        if (!this.events[eventID]){
            return false;
        }

        for (var i=0;i<this.events[eventID].length;i++) {
            if (this.events[eventID][i]== f) {
                this.events[eventID].splice(i,1);
                bResult = true;
            }
        }
        return bResult;
    },       

    /**
     * trigger an event and call all registered listener functions.
     * This is intended to be called by 'this'.  The eventID param
     * is mandatory.  Any additional arguments will be passed to the
     * listener function.
     *
     * @param eventID the event ID to trigger
     */
    triggerEvent : function( eventID ) {
        var ev = new String(eventID);
        if (!this.events || !this.events[eventID]) {
            return false;
        }

        for (var i=0; i<this.events[eventID].length; i++) {
            this.events[eventID][i].apply(null, arguments);
        }
        return true;
    }
};

Object.inheritFrom(Fusion, Fusion.Lib.EventMgr, []);

Fusion.Event.FUSION_INITIALIZED = Fusion.Event.lastEventId++;
Fusion.Event.FUSION_ERROR = Fusion.Event.lastEventId++;
Fusion.registerEventID(Fusion.Event.FUSION_INITIALIZED);
Fusion.registerEventID(Fusion.Event.FUSION_ERROR);