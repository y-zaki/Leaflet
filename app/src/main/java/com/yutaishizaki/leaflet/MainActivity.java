package com.yutaishizaki.leaflet;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.*;
import android.webkit.GeolocationPermissions.Callback;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView webView1 = findViewById(R.id.webView1);

        //JavaScript有効化
        webView1.getSettings().setJavaScriptEnabled(true);

        //位置情報有効化
        webView1.getSettings().setGeolocationEnabled(true);
        webView1.setWebChromeClient(new WebChromeClient(){
            @Override
            public void onGeolocationPermissionsShowPrompt(String origin, Callback callback){
                callback.invoke(origin, true, false);
            }
        });

        //map_display.htmlをロード
        webView1.loadUrl("file:///android_asset/map_display.html");
    }
}
