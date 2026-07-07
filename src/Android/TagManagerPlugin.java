package com.productleague;

import org.apache.cordova.CordovaPlugin;

public class TagManagerPlugin extends CordovaPlugin {

    @Override
    protected void pluginInitialize() {
        super.pluginInitialize();

        android.util.Log.i("GTMPlugin", "Initializing Google Tag Manager");

        // We'll add the GTM initialization here next.
    }
}
