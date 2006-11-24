/********************************************************************** * 
 * @project Fusion
 * @revision $Id $
 * @purpose MapMenu widget
 * @author zjames@dmsolutions.ca
 * @copyright (c) 2006 DM Solutions Group Inc.
 * @license MIT
 * ********************************************************************
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 * * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 * * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 ********************************************************************
 *
 * MapMenu 
 *
 * To put a MapMenu control in your application, you first need to add a
 * widget to your WebLayout as follows:
 *
 * <Command xsi:type="MapMenuCommandType">
 *   <Name>MyMapMenu</Name>
 *   <Label>Map Menu</Label>
 *   <Folder>Library://Samples/</Folder>
 *   <TargetViewer>All</TargetViewer>
 *   <Action>MapMenu</Action>
 * </Command>
 *
 * The important parts of this Command are:
 *
 * Name (string, mandatory) 
 * 
 * an element with an id that is the same as this name must be in
 * the application.  For instance:
 *
 * <div id="MyMapMenu"></div>
 *
 * The MapMenu will appear inside the element you provide.
 * 
 * Folder (string, optional)
 *
 * The repository folder to enumerate maps below. If this is not set,
 * the entire repository is enumerated.
 * **********************************************************************/
Fusion.require('widgets/GxButtonBase.js');

var MapMenu = Class.create();
MapMenu.prototype = 
{
    _oDomObj: null,
    oMenu: null,
    sRootFolder: '',
    aMenus : null,
    initialize : function(oCommand)
    {
        //console.log('MapMenu.initialize');
        Object.inheritFrom(this, GxWidget.prototype, ['MapMenu', true]);
        Object.inheritFrom(this, GxButtonBase.prototype, [oCommand]);
        this.setMap(oCommand.getMap());
        
        this._oDomObj = $(oCommand.getName());
        this._sLabel = oCommand.oxmlNode.getNodeText('Label');
        this._sImageURL = oCommand.oxmlNode.getNodeText('ImageURL');
        
        //set up the root menu
        this.oMenu = new JxButtonMenu(this._sLabel);
        this._oButton._oDomObj.appendChild(this.oMenu.domObj);
        
        //get the mapdefinitions as xml
        this.sRootFolder = (oCommand.oxmlNode.findFirstNode('Folder'))?
                      oCommand.oxmlNode.getNodeText('Folder'):'Library://';
        var s =        'server/' + Fusion.getScriptLanguage() +
                      '/MGMapMenu.' + Fusion.getScriptLanguage();
        var params =  {parameters:'session='+Fusion.getSessionID() +
                      //'&mapname='+ this.getMap().getMapName() +
                      '&folder='+this.sRootFolder,
                      onComplete: this.processMapMenu.bind(this)};

        Fusion.ajaxRequest(s, params);
    },

    processMapMenu: function(r) {
        if (r.responseXML) {
            this.aMenus = {};
            var node = new DomNode(r.responseXML);
            var mapNode = node.findFirstNode('MapDefinition');
            while (mapNode) {
                
                var sId = mapNode.getNodeText('ResourceId');
                var sPath = sId.replace(this.sRootFolder, '');
                sPath = sPath.slice(0, sPath.lastIndexOf('/'));
                this.createFolders(sPath);
                var opt = {};
                opt.label = mapNode.getNodeText('Name');
                var data = mapNode.getNodeText('ResourceId');
                var action = new JxAction(this.switchMap.bind(this, data));
                var menuItem = new JxMenuItem(action,opt);
                
                if (sPath == '') {
                    this.oMenu.add(menuItem);
                }else {
                    this.aMenus[sPath].add(menuItem);
                }
                
                mapNode = node.findNextNode('MapDefinition');
            }
        }
    },
    
    createFolders: function(sId) {
        var aPath = sId.split('/');
        //console.log('MapMenu::createFolders -'+sId +' -> '+ aPath);
        
        //loop through folders, creating them if they don't exist
        var sParent = '';
        var sSep = '';
        for (var i=0; i < aPath.length; i++) {
            if (!this.aMenus[sParent + sSep + aPath[i]]){
                var opt = {label:aPath[i]};
                var menu = new JxMenu(opt);
                //console.log('MapMenu::createFolders -'+sParent);
                if (sParent == '') {
                    this.oMenu.add(menu);
                } else {
                    this.aMenus[sParent].add(menu);
                }
                this.aMenus[sParent + sSep + aPath[i]] = menu;
            }
            sParent = sParent + sSep + aPath[i];
            sSep = '/';
        };
    },
    
    //action to perform when the button is clicked
    activateTool: function() {
        this.oMenu.show();
    },
    
    switchMap: function(data) {
        this.getMap().loadMap(data);
    }
};