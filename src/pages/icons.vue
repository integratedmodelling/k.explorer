<template>
  <q-page padding>
    <!--
    <img src="statics/klab-logo.png"/>
    <input type="text" v-model="color" name="color"/><br/>
    <input type="checkbox" v-model="animated" name="animated"/><br/>
    <input type="number" v-model="size" name="size"/><br/>
    <klab-spinner :animated="animated" :color="color" :size="size" class="q-ma-md full-width"/>
    -->
    <!-- MDI Icons -->
    <h4><a href="https://materialdesignicons.com/" target="_blank">MDI Icons</a></h4>
    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-access-point"></q-icon>
      <span class="q-ml-md">mdi-access-point</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-access-point-network"></q-icon>
      <span class="q-ml-md">mdi-access-point-network</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account"></q-icon>
      <span class="q-ml-md">mdi-account</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-alert"></q-icon>
      <span class="q-ml-md">mdi-account-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-box"></q-icon>
      <span class="q-ml-md">mdi-account-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-box-multiple"></q-icon>
      <span class="q-ml-md">mdi-account-box-multiple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-box-outline"></q-icon>
      <span class="q-ml-md">mdi-account-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-card-details"></q-icon>
      <span class="q-ml-md">mdi-account-card-details</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-check"></q-icon>
      <span class="q-ml-md">mdi-account-check</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-circle"></q-icon>
      <span class="q-ml-md">mdi-account-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-convert"></q-icon>
      <span class="q-ml-md">mdi-account-convert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-edit"></q-icon>
      <span class="q-ml-md">mdi-account-edit</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-group"></q-icon>
      <span class="q-ml-md">mdi-account-group</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-heart"></q-icon>
      <span class="q-ml-md">mdi-account-heart</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-key"></q-icon>
      <span class="q-ml-md">mdi-account-key</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-location"></q-icon>
      <span class="q-ml-md">mdi-account-location</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-minus"></q-icon>
      <span class="q-ml-md">mdi-account-minus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-multiple"></q-icon>
      <span class="q-ml-md">mdi-account-multiple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-multiple-check"></q-icon>
      <span class="q-ml-md">mdi-account-multiple-check</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-multiple-minus"></q-icon>
      <span class="q-ml-md">mdi-account-multiple-minus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-multiple-outline"></q-icon>
      <span class="q-ml-md">mdi-account-multiple-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-multiple-plus"></q-icon>
      <span class="q-ml-md">mdi-account-multiple-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-multiple-plus-outline"></q-icon>
      <span class="q-ml-md">mdi-account-multiple-plus-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-network"></q-icon>
      <span class="q-ml-md">mdi-account-network</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-off"></q-icon>
      <span class="q-ml-md">mdi-account-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-outline"></q-icon>
      <span class="q-ml-md">mdi-account-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-plus"></q-icon>
      <span class="q-ml-md">mdi-account-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-plus-outline"></q-icon>
      <span class="q-ml-md">mdi-account-plus-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-remove"></q-icon>
      <span class="q-ml-md">mdi-account-remove</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-search"></q-icon>
      <span class="q-ml-md">mdi-account-search</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-search-outline"></q-icon>
      <span class="q-ml-md">mdi-account-search-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-settings"></q-icon>
      <span class="q-ml-md">mdi-account-settings</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-settings-variant"></q-icon>
      <span class="q-ml-md">mdi-account-settings-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-star"></q-icon>
      <span class="q-ml-md">mdi-account-star</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-account-switch"></q-icon>
      <span class="q-ml-md">mdi-account-switch</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-accusoft"></q-icon>
      <span class="q-ml-md">mdi-accusoft</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-adjust"></q-icon>
      <span class="q-ml-md">mdi-adjust</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-adobe"></q-icon>
      <span class="q-ml-md">mdi-adobe</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-air-conditioner"></q-icon>
      <span class="q-ml-md">mdi-air-conditioner</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-airballoon"></q-icon>
      <span class="q-ml-md">mdi-airballoon</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-airplane"></q-icon>
      <span class="q-ml-md">mdi-airplane</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-airplane-landing"></q-icon>
      <span class="q-ml-md">mdi-airplane-landing</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-airplane-off"></q-icon>
      <span class="q-ml-md">mdi-airplane-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-airplane-takeoff"></q-icon>
      <span class="q-ml-md">mdi-airplane-takeoff</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-airplay"></q-icon>
      <span class="q-ml-md">mdi-airplay</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-airport"></q-icon>
      <span class="q-ml-md">mdi-airport</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-alarm"></q-icon>
      <span class="q-ml-md">mdi-alarm</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-alarm-bell"></q-icon>
      <span class="q-ml-md">mdi-alarm-bell</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-alarm-check"></q-icon>
      <span class="q-ml-md">mdi-alarm-check</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-alarm-light"></q-icon>
      <span class="q-ml-md">mdi-alarm-light</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-alarm-multiple"></q-icon>
      <span class="q-ml-md">mdi-alarm-multiple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-alarm-off"></q-icon>
      <span class="q-ml-md">mdi-alarm-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-alarm-plus"></q-icon>
      <span class="q-ml-md">mdi-alarm-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-alarm-snooze"></q-icon>
      <span class="q-ml-md">mdi-alarm-snooze</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-album"></q-icon>
      <span class="q-ml-md">mdi-album</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-alert"></q-icon>
      <span class="q-ml-md">mdi-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-alert-box"></q-icon>
      <span class="q-ml-md">mdi-alert-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-alert-circle"></q-icon>
      <span class="q-ml-md">mdi-alert-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-alert-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-alert-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-alert-decagram"></q-icon>
      <span class="q-ml-md">mdi-alert-decagram</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-alert-octagon"></q-icon>
      <span class="q-ml-md">mdi-alert-octagon</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-alert-octagram"></q-icon>
      <span class="q-ml-md">mdi-alert-octagram</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-alert-outline"></q-icon>
      <span class="q-ml-md">mdi-alert-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-alien"></q-icon>
      <span class="q-ml-md">mdi-alien</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-all-inclusive"></q-icon>
      <span class="q-ml-md">mdi-all-inclusive</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-alpha"></q-icon>
      <span class="q-ml-md">mdi-alpha</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-alphabetical"></q-icon>
      <span class="q-ml-md">mdi-alphabetical</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-altimeter"></q-icon>
      <span class="q-ml-md">mdi-altimeter</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-amazon"></q-icon>
      <span class="q-ml-md">mdi-amazon</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-amazon-alexa"></q-icon>
      <span class="q-ml-md">mdi-amazon-alexa</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-amazon-drive"></q-icon>
      <span class="q-ml-md">mdi-amazon-drive</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ambulance"></q-icon>
      <span class="q-ml-md">mdi-ambulance</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-amplifier"></q-icon>
      <span class="q-ml-md">mdi-amplifier</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-anchor"></q-icon>
      <span class="q-ml-md">mdi-anchor</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-android"></q-icon>
      <span class="q-ml-md">mdi-android</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-android-debug-bridge"></q-icon>
      <span class="q-ml-md">mdi-android-debug-bridge</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-android-head"></q-icon>
      <span class="q-ml-md">mdi-android-head</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-android-studio"></q-icon>
      <span class="q-ml-md">mdi-android-studio</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-angle-acute"></q-icon>
      <span class="q-ml-md">mdi-angle-acute</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-angle-obtuse"></q-icon>
      <span class="q-ml-md">mdi-angle-obtuse</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-angle-right"></q-icon>
      <span class="q-ml-md">mdi-angle-right</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-angular"></q-icon>
      <span class="q-ml-md">mdi-angular</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-angularjs"></q-icon>
      <span class="q-ml-md">mdi-angularjs</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-animation"></q-icon>
      <span class="q-ml-md">mdi-animation</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-animation-play"></q-icon>
      <span class="q-ml-md">mdi-animation-play</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-anvil"></q-icon>
      <span class="q-ml-md">mdi-anvil</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-apple"></q-icon>
      <span class="q-ml-md">mdi-apple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-apple-finder"></q-icon>
      <span class="q-ml-md">mdi-apple-finder</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-apple-icloud"></q-icon>
      <span class="q-ml-md">mdi-apple-icloud</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-apple-ios"></q-icon>
      <span class="q-ml-md">mdi-apple-ios</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-apple-keyboard-caps"></q-icon>
      <span class="q-ml-md">mdi-apple-keyboard-caps</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-apple-keyboard-command"></q-icon>
      <span class="q-ml-md">mdi-apple-keyboard-command</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-apple-keyboard-control"></q-icon>
      <span class="q-ml-md">mdi-apple-keyboard-control</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-apple-keyboard-option"></q-icon>
      <span class="q-ml-md">mdi-apple-keyboard-option</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-apple-keyboard-shift"></q-icon>
      <span class="q-ml-md">mdi-apple-keyboard-shift</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-apple-safari"></q-icon>
      <span class="q-ml-md">mdi-apple-safari</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-application"></q-icon>
      <span class="q-ml-md">mdi-application</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-apps"></q-icon>
      <span class="q-ml-md">mdi-apps</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arch"></q-icon>
      <span class="q-ml-md">mdi-arch</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-archive"></q-icon>
      <span class="q-ml-md">mdi-archive</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrange-bring-forward"></q-icon>
      <span class="q-ml-md">mdi-arrange-bring-forward</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrange-bring-to-front"></q-icon>
      <span class="q-ml-md">mdi-arrange-bring-to-front</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrange-send-backward"></q-icon>
      <span class="q-ml-md">mdi-arrange-send-backward</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrange-send-to-back"></q-icon>
      <span class="q-ml-md">mdi-arrange-send-to-back</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-all"></q-icon>
      <span class="q-ml-md">mdi-arrow-all</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-bottom-left"></q-icon>
      <span class="q-ml-md">mdi-arrow-bottom-left</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-bottom-left-bold-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-bottom-left-bold-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-bottom-left-thick"></q-icon>
      <span class="q-ml-md">mdi-arrow-bottom-left-thick</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-bottom-right"></q-icon>
      <span class="q-ml-md">mdi-arrow-bottom-right</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-bottom-right-bold-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-bottom-right-bold-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-bottom-right-thick"></q-icon>
      <span class="q-ml-md">mdi-arrow-bottom-right-thick</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-collapse"></q-icon>
      <span class="q-ml-md">mdi-arrow-collapse</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-collapse-all"></q-icon>
      <span class="q-ml-md">mdi-arrow-collapse-all</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-collapse-down"></q-icon>
      <span class="q-ml-md">mdi-arrow-collapse-down</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-collapse-horizontal"></q-icon>
      <span class="q-ml-md">mdi-arrow-collapse-horizontal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-collapse-left"></q-icon>
      <span class="q-ml-md">mdi-arrow-collapse-left</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-collapse-right"></q-icon>
      <span class="q-ml-md">mdi-arrow-collapse-right</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-collapse-up"></q-icon>
      <span class="q-ml-md">mdi-arrow-collapse-up</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-collapse-vertical"></q-icon>
      <span class="q-ml-md">mdi-arrow-collapse-vertical</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-decision"></q-icon>
      <span class="q-ml-md">mdi-arrow-decision</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-decision-auto"></q-icon>
      <span class="q-ml-md">mdi-arrow-decision-auto</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-decision-auto-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-decision-auto-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-decision-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-decision-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-down"></q-icon>
      <span class="q-ml-md">mdi-arrow-down</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-down-bold"></q-icon>
      <span class="q-ml-md">mdi-arrow-down-bold</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-down-bold-box"></q-icon>
      <span class="q-ml-md">mdi-arrow-down-bold-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-down-bold-box-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-down-bold-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-down-bold-circle"></q-icon>
      <span class="q-ml-md">mdi-arrow-down-bold-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-down-bold-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-down-bold-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-down-bold-hexagon-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-down-bold-hexagon-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-down-bold-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-down-bold-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-down-box"></q-icon>
      <span class="q-ml-md">mdi-arrow-down-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-down-drop-circle"></q-icon>
      <span class="q-ml-md">mdi-arrow-down-drop-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-down-drop-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-down-drop-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-down-thick"></q-icon>
      <span class="q-ml-md">mdi-arrow-down-thick</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-expand"></q-icon>
      <span class="q-ml-md">mdi-arrow-expand</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-expand-all"></q-icon>
      <span class="q-ml-md">mdi-arrow-expand-all</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-expand-down"></q-icon>
      <span class="q-ml-md">mdi-arrow-expand-down</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-expand-horizontal"></q-icon>
      <span class="q-ml-md">mdi-arrow-expand-horizontal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-expand-left"></q-icon>
      <span class="q-ml-md">mdi-arrow-expand-left</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-expand-right"></q-icon>
      <span class="q-ml-md">mdi-arrow-expand-right</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-expand-up"></q-icon>
      <span class="q-ml-md">mdi-arrow-expand-up</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-expand-vertical"></q-icon>
      <span class="q-ml-md">mdi-arrow-expand-vertical</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-left"></q-icon>
      <span class="q-ml-md">mdi-arrow-left</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-left-bold"></q-icon>
      <span class="q-ml-md">mdi-arrow-left-bold</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-left-bold-box"></q-icon>
      <span class="q-ml-md">mdi-arrow-left-bold-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-left-bold-box-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-left-bold-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-left-bold-circle"></q-icon>
      <span class="q-ml-md">mdi-arrow-left-bold-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-left-bold-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-left-bold-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-left-bold-hexagon-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-left-bold-hexagon-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-left-bold-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-left-bold-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-left-box"></q-icon>
      <span class="q-ml-md">mdi-arrow-left-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-left-drop-circle"></q-icon>
      <span class="q-ml-md">mdi-arrow-left-drop-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-left-drop-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-left-drop-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-left-right-bold-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-left-right-bold-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-left-thick"></q-icon>
      <span class="q-ml-md">mdi-arrow-left-thick</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-right"></q-icon>
      <span class="q-ml-md">mdi-arrow-right</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-right-bold"></q-icon>
      <span class="q-ml-md">mdi-arrow-right-bold</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-right-bold-box"></q-icon>
      <span class="q-ml-md">mdi-arrow-right-bold-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-right-bold-box-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-right-bold-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-right-bold-circle"></q-icon>
      <span class="q-ml-md">mdi-arrow-right-bold-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-right-bold-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-right-bold-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-right-bold-hexagon-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-right-bold-hexagon-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-right-bold-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-right-bold-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-right-box"></q-icon>
      <span class="q-ml-md">mdi-arrow-right-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-right-drop-circle"></q-icon>
      <span class="q-ml-md">mdi-arrow-right-drop-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-right-drop-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-right-drop-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-right-thick"></q-icon>
      <span class="q-ml-md">mdi-arrow-right-thick</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-split-horizontal"></q-icon>
      <span class="q-ml-md">mdi-arrow-split-horizontal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-split-vertical"></q-icon>
      <span class="q-ml-md">mdi-arrow-split-vertical</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-top-left"></q-icon>
      <span class="q-ml-md">mdi-arrow-top-left</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-top-left-bold-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-top-left-bold-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-top-left-thick"></q-icon>
      <span class="q-ml-md">mdi-arrow-top-left-thick</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-top-right"></q-icon>
      <span class="q-ml-md">mdi-arrow-top-right</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-top-right-bold-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-top-right-bold-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-top-right-thick"></q-icon>
      <span class="q-ml-md">mdi-arrow-top-right-thick</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-up"></q-icon>
      <span class="q-ml-md">mdi-arrow-up</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-up-bold"></q-icon>
      <span class="q-ml-md">mdi-arrow-up-bold</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-up-bold-box"></q-icon>
      <span class="q-ml-md">mdi-arrow-up-bold-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-up-bold-box-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-up-bold-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-up-bold-circle"></q-icon>
      <span class="q-ml-md">mdi-arrow-up-bold-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-up-bold-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-up-bold-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-up-bold-hexagon-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-up-bold-hexagon-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-up-bold-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-up-bold-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-up-box"></q-icon>
      <span class="q-ml-md">mdi-arrow-up-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-up-down-bold-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-up-down-bold-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-up-drop-circle"></q-icon>
      <span class="q-ml-md">mdi-arrow-up-drop-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-up-drop-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-arrow-up-drop-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-arrow-up-thick"></q-icon>
      <span class="q-ml-md">mdi-arrow-up-thick</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-artist"></q-icon>
      <span class="q-ml-md">mdi-artist</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-aspect-ratio"></q-icon>
      <span class="q-ml-md">mdi-aspect-ratio</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-assistant"></q-icon>
      <span class="q-ml-md">mdi-assistant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-asterisk"></q-icon>
      <span class="q-ml-md">mdi-asterisk</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-at"></q-icon>
      <span class="q-ml-md">mdi-at</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-atlassian"></q-icon>
      <span class="q-ml-md">mdi-atlassian</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-atom"></q-icon>
      <span class="q-ml-md">mdi-atom</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-attachment"></q-icon>
      <span class="q-ml-md">mdi-attachment</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-audio-video"></q-icon>
      <span class="q-ml-md">mdi-audio-video</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-audiobook"></q-icon>
      <span class="q-ml-md">mdi-audiobook</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-augmented-reality"></q-icon>
      <span class="q-ml-md">mdi-augmented-reality</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-auto-fix"></q-icon>
      <span class="q-ml-md">mdi-auto-fix</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-auto-upload"></q-icon>
      <span class="q-ml-md">mdi-auto-upload</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-autorenew"></q-icon>
      <span class="q-ml-md">mdi-autorenew</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-av-timer"></q-icon>
      <span class="q-ml-md">mdi-av-timer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-axe"></q-icon>
      <span class="q-ml-md">mdi-axe</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-azure"></q-icon>
      <span class="q-ml-md">mdi-azure</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-babel"></q-icon>
      <span class="q-ml-md">mdi-babel</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-baby"></q-icon>
      <span class="q-ml-md">mdi-baby</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-baby-buggy"></q-icon>
      <span class="q-ml-md">mdi-baby-buggy</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-backburger"></q-icon>
      <span class="q-ml-md">mdi-backburger</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-backspace"></q-icon>
      <span class="q-ml-md">mdi-backspace</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-backup-restore"></q-icon>
      <span class="q-ml-md">mdi-backup-restore</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-badminton"></q-icon>
      <span class="q-ml-md">mdi-badminton</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-balloon"></q-icon>
      <span class="q-ml-md">mdi-balloon</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ballot"></q-icon>
      <span class="q-ml-md">mdi-ballot</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ballot-outline"></q-icon>
      <span class="q-ml-md">mdi-ballot-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bandcamp"></q-icon>
      <span class="q-ml-md">mdi-bandcamp</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bank"></q-icon>
      <span class="q-ml-md">mdi-bank</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bank-transfer"></q-icon>
      <span class="q-ml-md">mdi-bank-transfer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bank-transfer-in"></q-icon>
      <span class="q-ml-md">mdi-bank-transfer-in</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bank-transfer-out"></q-icon>
      <span class="q-ml-md">mdi-bank-transfer-out</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-barcode"></q-icon>
      <span class="q-ml-md">mdi-barcode</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-barcode-scan"></q-icon>
      <span class="q-ml-md">mdi-barcode-scan</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-barley"></q-icon>
      <span class="q-ml-md">mdi-barley</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-barrel"></q-icon>
      <span class="q-ml-md">mdi-barrel</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-baseball"></q-icon>
      <span class="q-ml-md">mdi-baseball</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-baseball-bat"></q-icon>
      <span class="q-ml-md">mdi-baseball-bat</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-basecamp"></q-icon>
      <span class="q-ml-md">mdi-basecamp</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-basket"></q-icon>
      <span class="q-ml-md">mdi-basket</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-basket-fill"></q-icon>
      <span class="q-ml-md">mdi-basket-fill</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-basket-unfill"></q-icon>
      <span class="q-ml-md">mdi-basket-unfill</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-basketball"></q-icon>
      <span class="q-ml-md">mdi-basketball</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery"></q-icon>
      <span class="q-ml-md">mdi-battery</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-10"></q-icon>
      <span class="q-ml-md">mdi-battery-10</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-10-bluetooth"></q-icon>
      <span class="q-ml-md">mdi-battery-10-bluetooth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-20"></q-icon>
      <span class="q-ml-md">mdi-battery-20</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-20-bluetooth"></q-icon>
      <span class="q-ml-md">mdi-battery-20-bluetooth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-30"></q-icon>
      <span class="q-ml-md">mdi-battery-30</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-30-bluetooth"></q-icon>
      <span class="q-ml-md">mdi-battery-30-bluetooth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-40"></q-icon>
      <span class="q-ml-md">mdi-battery-40</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-40-bluetooth"></q-icon>
      <span class="q-ml-md">mdi-battery-40-bluetooth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-50"></q-icon>
      <span class="q-ml-md">mdi-battery-50</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-50-bluetooth"></q-icon>
      <span class="q-ml-md">mdi-battery-50-bluetooth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-60"></q-icon>
      <span class="q-ml-md">mdi-battery-60</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-60-bluetooth"></q-icon>
      <span class="q-ml-md">mdi-battery-60-bluetooth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-70"></q-icon>
      <span class="q-ml-md">mdi-battery-70</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-70-bluetooth"></q-icon>
      <span class="q-ml-md">mdi-battery-70-bluetooth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-80"></q-icon>
      <span class="q-ml-md">mdi-battery-80</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-80-bluetooth"></q-icon>
      <span class="q-ml-md">mdi-battery-80-bluetooth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-90"></q-icon>
      <span class="q-ml-md">mdi-battery-90</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-90-bluetooth"></q-icon>
      <span class="q-ml-md">mdi-battery-90-bluetooth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-alert"></q-icon>
      <span class="q-ml-md">mdi-battery-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-alert-bluetooth"></q-icon>
      <span class="q-ml-md">mdi-battery-alert-bluetooth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-bluetooth"></q-icon>
      <span class="q-ml-md">mdi-battery-bluetooth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-bluetooth-variant"></q-icon>
      <span class="q-ml-md">mdi-battery-bluetooth-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging"></q-icon>
      <span class="q-ml-md">mdi-battery-charging</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging-10"></q-icon>
      <span class="q-ml-md">mdi-battery-charging-10</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging-100"></q-icon>
      <span class="q-ml-md">mdi-battery-charging-100</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging-20"></q-icon>
      <span class="q-ml-md">mdi-battery-charging-20</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging-30"></q-icon>
      <span class="q-ml-md">mdi-battery-charging-30</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging-40"></q-icon>
      <span class="q-ml-md">mdi-battery-charging-40</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging-50"></q-icon>
      <span class="q-ml-md">mdi-battery-charging-50</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging-60"></q-icon>
      <span class="q-ml-md">mdi-battery-charging-60</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging-70"></q-icon>
      <span class="q-ml-md">mdi-battery-charging-70</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging-80"></q-icon>
      <span class="q-ml-md">mdi-battery-charging-80</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging-90"></q-icon>
      <span class="q-ml-md">mdi-battery-charging-90</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging-outline"></q-icon>
      <span class="q-ml-md">mdi-battery-charging-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging-wireless"></q-icon>
      <span class="q-ml-md">mdi-battery-charging-wireless</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging-wireless-10"></q-icon>
      <span class="q-ml-md">mdi-battery-charging-wireless-10</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging-wireless-20"></q-icon>
      <span class="q-ml-md">mdi-battery-charging-wireless-20</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging-wireless-30"></q-icon>
      <span class="q-ml-md">mdi-battery-charging-wireless-30</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging-wireless-40"></q-icon>
      <span class="q-ml-md">mdi-battery-charging-wireless-40</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging-wireless-50"></q-icon>
      <span class="q-ml-md">mdi-battery-charging-wireless-50</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging-wireless-60"></q-icon>
      <span class="q-ml-md">mdi-battery-charging-wireless-60</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging-wireless-70"></q-icon>
      <span class="q-ml-md">mdi-battery-charging-wireless-70</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging-wireless-80"></q-icon>
      <span class="q-ml-md">mdi-battery-charging-wireless-80</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging-wireless-90"></q-icon>
      <span class="q-ml-md">mdi-battery-charging-wireless-90</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging-wireless-alert"></q-icon>
      <span class="q-ml-md">mdi-battery-charging-wireless-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-charging-wireless-outline"></q-icon>
      <span class="q-ml-md">mdi-battery-charging-wireless-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-minus"></q-icon>
      <span class="q-ml-md">mdi-battery-minus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-negative"></q-icon>
      <span class="q-ml-md">mdi-battery-negative</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-outline"></q-icon>
      <span class="q-ml-md">mdi-battery-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-plus"></q-icon>
      <span class="q-ml-md">mdi-battery-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-positive"></q-icon>
      <span class="q-ml-md">mdi-battery-positive</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-unknown"></q-icon>
      <span class="q-ml-md">mdi-battery-unknown</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-battery-unknown-bluetooth"></q-icon>
      <span class="q-ml-md">mdi-battery-unknown-bluetooth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-beach"></q-icon>
      <span class="q-ml-md">mdi-beach</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-beaker"></q-icon>
      <span class="q-ml-md">mdi-beaker</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-beats"></q-icon>
      <span class="q-ml-md">mdi-beats</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bed-empty"></q-icon>
      <span class="q-ml-md">mdi-bed-empty</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-beer"></q-icon>
      <span class="q-ml-md">mdi-beer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-behance"></q-icon>
      <span class="q-ml-md">mdi-behance</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bell"></q-icon>
      <span class="q-ml-md">mdi-bell</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bell-off"></q-icon>
      <span class="q-ml-md">mdi-bell-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bell-outline"></q-icon>
      <span class="q-ml-md">mdi-bell-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bell-plus"></q-icon>
      <span class="q-ml-md">mdi-bell-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bell-ring"></q-icon>
      <span class="q-ml-md">mdi-bell-ring</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bell-ring-outline"></q-icon>
      <span class="q-ml-md">mdi-bell-ring-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bell-sleep"></q-icon>
      <span class="q-ml-md">mdi-bell-sleep</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-beta"></q-icon>
      <span class="q-ml-md">mdi-beta</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-betamax"></q-icon>
      <span class="q-ml-md">mdi-betamax</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bible"></q-icon>
      <span class="q-ml-md">mdi-bible</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bike"></q-icon>
      <span class="q-ml-md">mdi-bike</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bing"></q-icon>
      <span class="q-ml-md">mdi-bing</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-binoculars"></q-icon>
      <span class="q-ml-md">mdi-binoculars</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bio"></q-icon>
      <span class="q-ml-md">mdi-bio</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-biohazard"></q-icon>
      <span class="q-ml-md">mdi-biohazard</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bitbucket"></q-icon>
      <span class="q-ml-md">mdi-bitbucket</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bitcoin"></q-icon>
      <span class="q-ml-md">mdi-bitcoin</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-black-mesa"></q-icon>
      <span class="q-ml-md">mdi-black-mesa</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-blackberry"></q-icon>
      <span class="q-ml-md">mdi-blackberry</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-blender"></q-icon>
      <span class="q-ml-md">mdi-blender</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-blinds"></q-icon>
      <span class="q-ml-md">mdi-blinds</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-block-helper"></q-icon>
      <span class="q-ml-md">mdi-block-helper</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-blogger"></q-icon>
      <span class="q-ml-md">mdi-blogger</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bluetooth"></q-icon>
      <span class="q-ml-md">mdi-bluetooth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bluetooth-audio"></q-icon>
      <span class="q-ml-md">mdi-bluetooth-audio</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bluetooth-connect"></q-icon>
      <span class="q-ml-md">mdi-bluetooth-connect</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bluetooth-off"></q-icon>
      <span class="q-ml-md">mdi-bluetooth-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bluetooth-settings"></q-icon>
      <span class="q-ml-md">mdi-bluetooth-settings</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bluetooth-transfer"></q-icon>
      <span class="q-ml-md">mdi-bluetooth-transfer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-blur"></q-icon>
      <span class="q-ml-md">mdi-blur</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-blur-linear"></q-icon>
      <span class="q-ml-md">mdi-blur-linear</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-blur-off"></q-icon>
      <span class="q-ml-md">mdi-blur-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-blur-radial"></q-icon>
      <span class="q-ml-md">mdi-blur-radial</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bomb"></q-icon>
      <span class="q-ml-md">mdi-bomb</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bomb-off"></q-icon>
      <span class="q-ml-md">mdi-bomb-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bone"></q-icon>
      <span class="q-ml-md">mdi-bone</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-book"></q-icon>
      <span class="q-ml-md">mdi-book</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-book-minus"></q-icon>
      <span class="q-ml-md">mdi-book-minus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-book-multiple"></q-icon>
      <span class="q-ml-md">mdi-book-multiple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-book-multiple-variant"></q-icon>
      <span class="q-ml-md">mdi-book-multiple-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-book-open"></q-icon>
      <span class="q-ml-md">mdi-book-open</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-book-open-page-variant"></q-icon>
      <span class="q-ml-md">mdi-book-open-page-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-book-open-variant"></q-icon>
      <span class="q-ml-md">mdi-book-open-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-book-plus"></q-icon>
      <span class="q-ml-md">mdi-book-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-book-secure"></q-icon>
      <span class="q-ml-md">mdi-book-secure</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-book-unsecure"></q-icon>
      <span class="q-ml-md">mdi-book-unsecure</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-book-variant"></q-icon>
      <span class="q-ml-md">mdi-book-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bookmark"></q-icon>
      <span class="q-ml-md">mdi-bookmark</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bookmark-check"></q-icon>
      <span class="q-ml-md">mdi-bookmark-check</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bookmark-minus"></q-icon>
      <span class="q-ml-md">mdi-bookmark-minus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bookmark-minus-outline"></q-icon>
      <span class="q-ml-md">mdi-bookmark-minus-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bookmark-music"></q-icon>
      <span class="q-ml-md">mdi-bookmark-music</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bookmark-off"></q-icon>
      <span class="q-ml-md">mdi-bookmark-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bookmark-off-outline"></q-icon>
      <span class="q-ml-md">mdi-bookmark-off-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bookmark-outline"></q-icon>
      <span class="q-ml-md">mdi-bookmark-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bookmark-plus"></q-icon>
      <span class="q-ml-md">mdi-bookmark-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bookmark-plus-outline"></q-icon>
      <span class="q-ml-md">mdi-bookmark-plus-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bookmark-remove"></q-icon>
      <span class="q-ml-md">mdi-bookmark-remove</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-boombox"></q-icon>
      <span class="q-ml-md">mdi-boombox</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bootstrap"></q-icon>
      <span class="q-ml-md">mdi-bootstrap</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-border-all"></q-icon>
      <span class="q-ml-md">mdi-border-all</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-border-all-variant"></q-icon>
      <span class="q-ml-md">mdi-border-all-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-border-bottom"></q-icon>
      <span class="q-ml-md">mdi-border-bottom</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-border-bottom-variant"></q-icon>
      <span class="q-ml-md">mdi-border-bottom-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-border-color"></q-icon>
      <span class="q-ml-md">mdi-border-color</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-border-horizontal"></q-icon>
      <span class="q-ml-md">mdi-border-horizontal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-border-inside"></q-icon>
      <span class="q-ml-md">mdi-border-inside</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-border-left"></q-icon>
      <span class="q-ml-md">mdi-border-left</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-border-left-variant"></q-icon>
      <span class="q-ml-md">mdi-border-left-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-border-none"></q-icon>
      <span class="q-ml-md">mdi-border-none</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-border-none-variant"></q-icon>
      <span class="q-ml-md">mdi-border-none-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-border-outside"></q-icon>
      <span class="q-ml-md">mdi-border-outside</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-border-right"></q-icon>
      <span class="q-ml-md">mdi-border-right</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-border-right-variant"></q-icon>
      <span class="q-ml-md">mdi-border-right-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-border-style"></q-icon>
      <span class="q-ml-md">mdi-border-style</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-border-top"></q-icon>
      <span class="q-ml-md">mdi-border-top</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-border-top-variant"></q-icon>
      <span class="q-ml-md">mdi-border-top-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-border-vertical"></q-icon>
      <span class="q-ml-md">mdi-border-vertical</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bottle-wine"></q-icon>
      <span class="q-ml-md">mdi-bottle-wine</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bow-tie"></q-icon>
      <span class="q-ml-md">mdi-bow-tie</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bowl"></q-icon>
      <span class="q-ml-md">mdi-bowl</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bowling"></q-icon>
      <span class="q-ml-md">mdi-bowling</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-box"></q-icon>
      <span class="q-ml-md">mdi-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-box-cutter"></q-icon>
      <span class="q-ml-md">mdi-box-cutter</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-box-shadow"></q-icon>
      <span class="q-ml-md">mdi-box-shadow</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-braille"></q-icon>
      <span class="q-ml-md">mdi-braille</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-brain"></q-icon>
      <span class="q-ml-md">mdi-brain</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bridge"></q-icon>
      <span class="q-ml-md">mdi-bridge</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-briefcase"></q-icon>
      <span class="q-ml-md">mdi-briefcase</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-briefcase-check"></q-icon>
      <span class="q-ml-md">mdi-briefcase-check</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-briefcase-download"></q-icon>
      <span class="q-ml-md">mdi-briefcase-download</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-briefcase-minus"></q-icon>
      <span class="q-ml-md">mdi-briefcase-minus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-briefcase-outline"></q-icon>
      <span class="q-ml-md">mdi-briefcase-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-briefcase-plus"></q-icon>
      <span class="q-ml-md">mdi-briefcase-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-briefcase-remove"></q-icon>
      <span class="q-ml-md">mdi-briefcase-remove</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-briefcase-search"></q-icon>
      <span class="q-ml-md">mdi-briefcase-search</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-briefcase-upload"></q-icon>
      <span class="q-ml-md">mdi-briefcase-upload</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-brightness-1"></q-icon>
      <span class="q-ml-md">mdi-brightness-1</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-brightness-2"></q-icon>
      <span class="q-ml-md">mdi-brightness-2</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-brightness-3"></q-icon>
      <span class="q-ml-md">mdi-brightness-3</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-brightness-4"></q-icon>
      <span class="q-ml-md">mdi-brightness-4</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-brightness-5"></q-icon>
      <span class="q-ml-md">mdi-brightness-5</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-brightness-6"></q-icon>
      <span class="q-ml-md">mdi-brightness-6</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-brightness-7"></q-icon>
      <span class="q-ml-md">mdi-brightness-7</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-brightness-auto"></q-icon>
      <span class="q-ml-md">mdi-brightness-auto</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-broom"></q-icon>
      <span class="q-ml-md">mdi-broom</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-brush"></q-icon>
      <span class="q-ml-md">mdi-brush</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-buddhism"></q-icon>
      <span class="q-ml-md">mdi-buddhism</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-buffer"></q-icon>
      <span class="q-ml-md">mdi-buffer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bug"></q-icon>
      <span class="q-ml-md">mdi-bug</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bug-check"></q-icon>
      <span class="q-ml-md">mdi-bug-check</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bug-check-outline"></q-icon>
      <span class="q-ml-md">mdi-bug-check-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bug-outline"></q-icon>
      <span class="q-ml-md">mdi-bug-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bulletin-board"></q-icon>
      <span class="q-ml-md">mdi-bulletin-board</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bullhorn"></q-icon>
      <span class="q-ml-md">mdi-bullhorn</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bullseye"></q-icon>
      <span class="q-ml-md">mdi-bullseye</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bullseye-arrow"></q-icon>
      <span class="q-ml-md">mdi-bullseye-arrow</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bus"></q-icon>
      <span class="q-ml-md">mdi-bus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bus-articulated-end"></q-icon>
      <span class="q-ml-md">mdi-bus-articulated-end</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bus-articulated-front"></q-icon>
      <span class="q-ml-md">mdi-bus-articulated-front</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bus-clock"></q-icon>
      <span class="q-ml-md">mdi-bus-clock</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bus-double-decker"></q-icon>
      <span class="q-ml-md">mdi-bus-double-decker</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bus-school"></q-icon>
      <span class="q-ml-md">mdi-bus-school</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-bus-side"></q-icon>
      <span class="q-ml-md">mdi-bus-side</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cached"></q-icon>
      <span class="q-ml-md">mdi-cached</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cake"></q-icon>
      <span class="q-ml-md">mdi-cake</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cake-layered"></q-icon>
      <span class="q-ml-md">mdi-cake-layered</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cake-variant"></q-icon>
      <span class="q-ml-md">mdi-cake-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-calculator"></q-icon>
      <span class="q-ml-md">mdi-calculator</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-calendar"></q-icon>
      <span class="q-ml-md">mdi-calendar</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-calendar-alert"></q-icon>
      <span class="q-ml-md">mdi-calendar-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-calendar-blank"></q-icon>
      <span class="q-ml-md">mdi-calendar-blank</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-calendar-check"></q-icon>
      <span class="q-ml-md">mdi-calendar-check</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-calendar-clock"></q-icon>
      <span class="q-ml-md">mdi-calendar-clock</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-calendar-edit"></q-icon>
      <span class="q-ml-md">mdi-calendar-edit</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-calendar-heart"></q-icon>
      <span class="q-ml-md">mdi-calendar-heart</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-calendar-multiple"></q-icon>
      <span class="q-ml-md">mdi-calendar-multiple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-calendar-multiple-check"></q-icon>
      <span class="q-ml-md">mdi-calendar-multiple-check</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-calendar-multiselect"></q-icon>
      <span class="q-ml-md">mdi-calendar-multiselect</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-calendar-plus"></q-icon>
      <span class="q-ml-md">mdi-calendar-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-calendar-question"></q-icon>
      <span class="q-ml-md">mdi-calendar-question</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-calendar-range"></q-icon>
      <span class="q-ml-md">mdi-calendar-range</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-calendar-remove"></q-icon>
      <span class="q-ml-md">mdi-calendar-remove</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-calendar-search"></q-icon>
      <span class="q-ml-md">mdi-calendar-search</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-calendar-star"></q-icon>
      <span class="q-ml-md">mdi-calendar-star</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-calendar-text"></q-icon>
      <span class="q-ml-md">mdi-calendar-text</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-calendar-today"></q-icon>
      <span class="q-ml-md">mdi-calendar-today</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-calendar-week"></q-icon>
      <span class="q-ml-md">mdi-calendar-week</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-calendar-week-begin"></q-icon>
      <span class="q-ml-md">mdi-calendar-week-begin</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-call-made"></q-icon>
      <span class="q-ml-md">mdi-call-made</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-call-merge"></q-icon>
      <span class="q-ml-md">mdi-call-merge</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-call-missed"></q-icon>
      <span class="q-ml-md">mdi-call-missed</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-call-received"></q-icon>
      <span class="q-ml-md">mdi-call-received</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-call-split"></q-icon>
      <span class="q-ml-md">mdi-call-split</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-camcorder"></q-icon>
      <span class="q-ml-md">mdi-camcorder</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-camcorder-box"></q-icon>
      <span class="q-ml-md">mdi-camcorder-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-camcorder-box-off"></q-icon>
      <span class="q-ml-md">mdi-camcorder-box-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-camcorder-off"></q-icon>
      <span class="q-ml-md">mdi-camcorder-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-camera"></q-icon>
      <span class="q-ml-md">mdi-camera</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-camera-account"></q-icon>
      <span class="q-ml-md">mdi-camera-account</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-camera-burst"></q-icon>
      <span class="q-ml-md">mdi-camera-burst</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-camera-enhance"></q-icon>
      <span class="q-ml-md">mdi-camera-enhance</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-camera-front"></q-icon>
      <span class="q-ml-md">mdi-camera-front</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-camera-front-variant"></q-icon>
      <span class="q-ml-md">mdi-camera-front-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-camera-gopro"></q-icon>
      <span class="q-ml-md">mdi-camera-gopro</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-camera-image"></q-icon>
      <span class="q-ml-md">mdi-camera-image</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-camera-iris"></q-icon>
      <span class="q-ml-md">mdi-camera-iris</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-camera-metering-center"></q-icon>
      <span class="q-ml-md">mdi-camera-metering-center</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-camera-metering-matrix"></q-icon>
      <span class="q-ml-md">mdi-camera-metering-matrix</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-camera-metering-partial"></q-icon>
      <span class="q-ml-md">mdi-camera-metering-partial</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-camera-metering-spot"></q-icon>
      <span class="q-ml-md">mdi-camera-metering-spot</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-camera-off"></q-icon>
      <span class="q-ml-md">mdi-camera-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-camera-party-mode"></q-icon>
      <span class="q-ml-md">mdi-camera-party-mode</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-camera-rear"></q-icon>
      <span class="q-ml-md">mdi-camera-rear</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-camera-rear-variant"></q-icon>
      <span class="q-ml-md">mdi-camera-rear-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-camera-switch"></q-icon>
      <span class="q-ml-md">mdi-camera-switch</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-camera-timer"></q-icon>
      <span class="q-ml-md">mdi-camera-timer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cancel"></q-icon>
      <span class="q-ml-md">mdi-cancel</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-candle"></q-icon>
      <span class="q-ml-md">mdi-candle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-candycane"></q-icon>
      <span class="q-ml-md">mdi-candycane</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cannabis"></q-icon>
      <span class="q-ml-md">mdi-cannabis</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-car"></q-icon>
      <span class="q-ml-md">mdi-car</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-car-battery"></q-icon>
      <span class="q-ml-md">mdi-car-battery</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-car-connected"></q-icon>
      <span class="q-ml-md">mdi-car-connected</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-car-convertible"></q-icon>
      <span class="q-ml-md">mdi-car-convertible</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-car-estate"></q-icon>
      <span class="q-ml-md">mdi-car-estate</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-car-hatchback"></q-icon>
      <span class="q-ml-md">mdi-car-hatchback</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-car-limousine"></q-icon>
      <span class="q-ml-md">mdi-car-limousine</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-car-pickup"></q-icon>
      <span class="q-ml-md">mdi-car-pickup</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-car-side"></q-icon>
      <span class="q-ml-md">mdi-car-side</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-car-sports"></q-icon>
      <span class="q-ml-md">mdi-car-sports</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-car-wash"></q-icon>
      <span class="q-ml-md">mdi-car-wash</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-caravan"></q-icon>
      <span class="q-ml-md">mdi-caravan</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cards"></q-icon>
      <span class="q-ml-md">mdi-cards</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cards-club"></q-icon>
      <span class="q-ml-md">mdi-cards-club</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cards-diamond"></q-icon>
      <span class="q-ml-md">mdi-cards-diamond</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cards-heart"></q-icon>
      <span class="q-ml-md">mdi-cards-heart</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cards-outline"></q-icon>
      <span class="q-ml-md">mdi-cards-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cards-playing-outline"></q-icon>
      <span class="q-ml-md">mdi-cards-playing-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cards-spade"></q-icon>
      <span class="q-ml-md">mdi-cards-spade</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cards-variant"></q-icon>
      <span class="q-ml-md">mdi-cards-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-carrot"></q-icon>
      <span class="q-ml-md">mdi-carrot</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cart"></q-icon>
      <span class="q-ml-md">mdi-cart</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cart-off"></q-icon>
      <span class="q-ml-md">mdi-cart-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cart-outline"></q-icon>
      <span class="q-ml-md">mdi-cart-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cart-plus"></q-icon>
      <span class="q-ml-md">mdi-cart-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-case-sensitive-alt"></q-icon>
      <span class="q-ml-md">mdi-case-sensitive-alt</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cash"></q-icon>
      <span class="q-ml-md">mdi-cash</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cash-100"></q-icon>
      <span class="q-ml-md">mdi-cash-100</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cash-multiple"></q-icon>
      <span class="q-ml-md">mdi-cash-multiple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cash-usd"></q-icon>
      <span class="q-ml-md">mdi-cash-usd</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cassette"></q-icon>
      <span class="q-ml-md">mdi-cassette</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cast"></q-icon>
      <span class="q-ml-md">mdi-cast</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cast-connected"></q-icon>
      <span class="q-ml-md">mdi-cast-connected</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cast-off"></q-icon>
      <span class="q-ml-md">mdi-cast-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-castle"></q-icon>
      <span class="q-ml-md">mdi-castle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cat"></q-icon>
      <span class="q-ml-md">mdi-cat</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cctv"></q-icon>
      <span class="q-ml-md">mdi-cctv</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ceiling-light"></q-icon>
      <span class="q-ml-md">mdi-ceiling-light</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cellphone"></q-icon>
      <span class="q-ml-md">mdi-cellphone</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cellphone-android"></q-icon>
      <span class="q-ml-md">mdi-cellphone-android</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cellphone-arrow-down"></q-icon>
      <span class="q-ml-md">mdi-cellphone-arrow-down</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cellphone-basic"></q-icon>
      <span class="q-ml-md">mdi-cellphone-basic</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cellphone-dock"></q-icon>
      <span class="q-ml-md">mdi-cellphone-dock</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cellphone-erase"></q-icon>
      <span class="q-ml-md">mdi-cellphone-erase</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cellphone-iphone"></q-icon>
      <span class="q-ml-md">mdi-cellphone-iphone</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cellphone-key"></q-icon>
      <span class="q-ml-md">mdi-cellphone-key</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cellphone-link"></q-icon>
      <span class="q-ml-md">mdi-cellphone-link</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cellphone-link-off"></q-icon>
      <span class="q-ml-md">mdi-cellphone-link-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cellphone-lock"></q-icon>
      <span class="q-ml-md">mdi-cellphone-lock</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cellphone-message"></q-icon>
      <span class="q-ml-md">mdi-cellphone-message</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cellphone-off"></q-icon>
      <span class="q-ml-md">mdi-cellphone-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cellphone-screenshot"></q-icon>
      <span class="q-ml-md">mdi-cellphone-screenshot</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cellphone-settings"></q-icon>
      <span class="q-ml-md">mdi-cellphone-settings</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cellphone-settings-variant"></q-icon>
      <span class="q-ml-md">mdi-cellphone-settings-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cellphone-sound"></q-icon>
      <span class="q-ml-md">mdi-cellphone-sound</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cellphone-text"></q-icon>
      <span class="q-ml-md">mdi-cellphone-text</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cellphone-wireless"></q-icon>
      <span class="q-ml-md">mdi-cellphone-wireless</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-certificate"></q-icon>
      <span class="q-ml-md">mdi-certificate</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chair-school"></q-icon>
      <span class="q-ml-md">mdi-chair-school</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chart-arc"></q-icon>
      <span class="q-ml-md">mdi-chart-arc</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chart-areaspline"></q-icon>
      <span class="q-ml-md">mdi-chart-areaspline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chart-bar"></q-icon>
      <span class="q-ml-md">mdi-chart-bar</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chart-bar-stacked"></q-icon>
      <span class="q-ml-md">mdi-chart-bar-stacked</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chart-bubble"></q-icon>
      <span class="q-ml-md">mdi-chart-bubble</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chart-donut"></q-icon>
      <span class="q-ml-md">mdi-chart-donut</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chart-donut-variant"></q-icon>
      <span class="q-ml-md">mdi-chart-donut-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chart-gantt"></q-icon>
      <span class="q-ml-md">mdi-chart-gantt</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chart-histogram"></q-icon>
      <span class="q-ml-md">mdi-chart-histogram</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chart-line"></q-icon>
      <span class="q-ml-md">mdi-chart-line</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chart-line-stacked"></q-icon>
      <span class="q-ml-md">mdi-chart-line-stacked</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chart-line-variant"></q-icon>
      <span class="q-ml-md">mdi-chart-line-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chart-multiline"></q-icon>
      <span class="q-ml-md">mdi-chart-multiline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chart-pie"></q-icon>
      <span class="q-ml-md">mdi-chart-pie</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chart-scatterplot-hexbin"></q-icon>
      <span class="q-ml-md">mdi-chart-scatterplot-hexbin</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chart-timeline"></q-icon>
      <span class="q-ml-md">mdi-chart-timeline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-check"></q-icon>
      <span class="q-ml-md">mdi-check</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-check-all"></q-icon>
      <span class="q-ml-md">mdi-check-all</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-check-circle"></q-icon>
      <span class="q-ml-md">mdi-check-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-check-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-check-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-check-decagram"></q-icon>
      <span class="q-ml-md">mdi-check-decagram</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-check-outline"></q-icon>
      <span class="q-ml-md">mdi-check-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-checkbox-blank"></q-icon>
      <span class="q-ml-md">mdi-checkbox-blank</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-checkbox-blank-circle"></q-icon>
      <span class="q-ml-md">mdi-checkbox-blank-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-checkbox-blank-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-checkbox-blank-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-checkbox-blank-outline"></q-icon>
      <span class="q-ml-md">mdi-checkbox-blank-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-checkbox-intermediate"></q-icon>
      <span class="q-ml-md">mdi-checkbox-intermediate</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-checkbox-marked"></q-icon>
      <span class="q-ml-md">mdi-checkbox-marked</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-checkbox-marked-circle"></q-icon>
      <span class="q-ml-md">mdi-checkbox-marked-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-checkbox-marked-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-checkbox-marked-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-checkbox-marked-outline"></q-icon>
      <span class="q-ml-md">mdi-checkbox-marked-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-checkbox-multiple-blank"></q-icon>
      <span class="q-ml-md">mdi-checkbox-multiple-blank</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-checkbox-multiple-blank-circle"></q-icon>
      <span class="q-ml-md">mdi-checkbox-multiple-blank-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-checkbox-multiple-blank-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-checkbox-multiple-blank-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-checkbox-multiple-blank-outline"></q-icon>
      <span class="q-ml-md">mdi-checkbox-multiple-blank-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-checkbox-multiple-marked"></q-icon>
      <span class="q-ml-md">mdi-checkbox-multiple-marked</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-checkbox-multiple-marked-circle"></q-icon>
      <span class="q-ml-md">mdi-checkbox-multiple-marked-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-checkbox-multiple-marked-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-checkbox-multiple-marked-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-checkbox-multiple-marked-outline"></q-icon>
      <span class="q-ml-md">mdi-checkbox-multiple-marked-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-checkerboard"></q-icon>
      <span class="q-ml-md">mdi-checkerboard</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chemical-weapon"></q-icon>
      <span class="q-ml-md">mdi-chemical-weapon</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chess-bishop"></q-icon>
      <span class="q-ml-md">mdi-chess-bishop</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chess-king"></q-icon>
      <span class="q-ml-md">mdi-chess-king</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chess-knight"></q-icon>
      <span class="q-ml-md">mdi-chess-knight</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chess-pawn"></q-icon>
      <span class="q-ml-md">mdi-chess-pawn</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chess-queen"></q-icon>
      <span class="q-ml-md">mdi-chess-queen</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chess-rook"></q-icon>
      <span class="q-ml-md">mdi-chess-rook</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chevron-double-down"></q-icon>
      <span class="q-ml-md">mdi-chevron-double-down</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chevron-double-left"></q-icon>
      <span class="q-ml-md">mdi-chevron-double-left</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chevron-double-right"></q-icon>
      <span class="q-ml-md">mdi-chevron-double-right</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chevron-double-up"></q-icon>
      <span class="q-ml-md">mdi-chevron-double-up</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chevron-down"></q-icon>
      <span class="q-ml-md">mdi-chevron-down</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chevron-down-box"></q-icon>
      <span class="q-ml-md">mdi-chevron-down-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chevron-down-box-outline"></q-icon>
      <span class="q-ml-md">mdi-chevron-down-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chevron-left"></q-icon>
      <span class="q-ml-md">mdi-chevron-left</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chevron-left-box"></q-icon>
      <span class="q-ml-md">mdi-chevron-left-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chevron-left-box-outline"></q-icon>
      <span class="q-ml-md">mdi-chevron-left-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chevron-right"></q-icon>
      <span class="q-ml-md">mdi-chevron-right</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chevron-right-box"></q-icon>
      <span class="q-ml-md">mdi-chevron-right-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chevron-right-box-outline"></q-icon>
      <span class="q-ml-md">mdi-chevron-right-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chevron-up"></q-icon>
      <span class="q-ml-md">mdi-chevron-up</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chevron-up-box"></q-icon>
      <span class="q-ml-md">mdi-chevron-up-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chevron-up-box-outline"></q-icon>
      <span class="q-ml-md">mdi-chevron-up-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chili-hot"></q-icon>
      <span class="q-ml-md">mdi-chili-hot</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chili-medium"></q-icon>
      <span class="q-ml-md">mdi-chili-medium</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chili-mild"></q-icon>
      <span class="q-ml-md">mdi-chili-mild</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-chip"></q-icon>
      <span class="q-ml-md">mdi-chip</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-christianity"></q-icon>
      <span class="q-ml-md">mdi-christianity</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-church"></q-icon>
      <span class="q-ml-md">mdi-church</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-circle"></q-icon>
      <span class="q-ml-md">mdi-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-circle-edit-outline"></q-icon>
      <span class="q-ml-md">mdi-circle-edit-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-circle-medium"></q-icon>
      <span class="q-ml-md">mdi-circle-medium</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-circle-small"></q-icon>
      <span class="q-ml-md">mdi-circle-small</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cisco-webex"></q-icon>
      <span class="q-ml-md">mdi-cisco-webex</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-city"></q-icon>
      <span class="q-ml-md">mdi-city</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-city-variant"></q-icon>
      <span class="q-ml-md">mdi-city-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-city-variant-outline"></q-icon>
      <span class="q-ml-md">mdi-city-variant-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clipboard"></q-icon>
      <span class="q-ml-md">mdi-clipboard</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clipboard-account"></q-icon>
      <span class="q-ml-md">mdi-clipboard-account</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clipboard-alert"></q-icon>
      <span class="q-ml-md">mdi-clipboard-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clipboard-arrow-down"></q-icon>
      <span class="q-ml-md">mdi-clipboard-arrow-down</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clipboard-arrow-left"></q-icon>
      <span class="q-ml-md">mdi-clipboard-arrow-left</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clipboard-check"></q-icon>
      <span class="q-ml-md">mdi-clipboard-check</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clipboard-check-outline"></q-icon>
      <span class="q-ml-md">mdi-clipboard-check-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clipboard-flow"></q-icon>
      <span class="q-ml-md">mdi-clipboard-flow</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clipboard-outline"></q-icon>
      <span class="q-ml-md">mdi-clipboard-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clipboard-plus"></q-icon>
      <span class="q-ml-md">mdi-clipboard-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clipboard-pulse"></q-icon>
      <span class="q-ml-md">mdi-clipboard-pulse</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clipboard-pulse-outline"></q-icon>
      <span class="q-ml-md">mdi-clipboard-pulse-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clipboard-text"></q-icon>
      <span class="q-ml-md">mdi-clipboard-text</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clipboard-text-outline"></q-icon>
      <span class="q-ml-md">mdi-clipboard-text-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clippy"></q-icon>
      <span class="q-ml-md">mdi-clippy</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clock"></q-icon>
      <span class="q-ml-md">mdi-clock</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clock-alert"></q-icon>
      <span class="q-ml-md">mdi-clock-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clock-alert-outline"></q-icon>
      <span class="q-ml-md">mdi-clock-alert-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clock-end"></q-icon>
      <span class="q-ml-md">mdi-clock-end</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clock-fast"></q-icon>
      <span class="q-ml-md">mdi-clock-fast</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clock-in"></q-icon>
      <span class="q-ml-md">mdi-clock-in</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clock-out"></q-icon>
      <span class="q-ml-md">mdi-clock-out</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clock-outline"></q-icon>
      <span class="q-ml-md">mdi-clock-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clock-start"></q-icon>
      <span class="q-ml-md">mdi-clock-start</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-close"></q-icon>
      <span class="q-ml-md">mdi-close</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-close-box"></q-icon>
      <span class="q-ml-md">mdi-close-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-close-box-outline"></q-icon>
      <span class="q-ml-md">mdi-close-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-close-circle"></q-icon>
      <span class="q-ml-md">mdi-close-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-close-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-close-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-close-network"></q-icon>
      <span class="q-ml-md">mdi-close-network</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-close-octagon"></q-icon>
      <span class="q-ml-md">mdi-close-octagon</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-close-octagon-outline"></q-icon>
      <span class="q-ml-md">mdi-close-octagon-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-close-outline"></q-icon>
      <span class="q-ml-md">mdi-close-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-closed-caption"></q-icon>
      <span class="q-ml-md">mdi-closed-caption</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cloud"></q-icon>
      <span class="q-ml-md">mdi-cloud</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cloud-alert"></q-icon>
      <span class="q-ml-md">mdi-cloud-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cloud-braces"></q-icon>
      <span class="q-ml-md">mdi-cloud-braces</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cloud-check"></q-icon>
      <span class="q-ml-md">mdi-cloud-check</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cloud-circle"></q-icon>
      <span class="q-ml-md">mdi-cloud-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cloud-download"></q-icon>
      <span class="q-ml-md">mdi-cloud-download</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cloud-off-outline"></q-icon>
      <span class="q-ml-md">mdi-cloud-off-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cloud-outline"></q-icon>
      <span class="q-ml-md">mdi-cloud-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cloud-print"></q-icon>
      <span class="q-ml-md">mdi-cloud-print</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cloud-print-outline"></q-icon>
      <span class="q-ml-md">mdi-cloud-print-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cloud-question"></q-icon>
      <span class="q-ml-md">mdi-cloud-question</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cloud-search"></q-icon>
      <span class="q-ml-md">mdi-cloud-search</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cloud-search-outline"></q-icon>
      <span class="q-ml-md">mdi-cloud-search-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cloud-sync"></q-icon>
      <span class="q-ml-md">mdi-cloud-sync</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cloud-tags"></q-icon>
      <span class="q-ml-md">mdi-cloud-tags</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cloud-upload"></q-icon>
      <span class="q-ml-md">mdi-cloud-upload</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-clover"></q-icon>
      <span class="q-ml-md">mdi-clover</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-code-array"></q-icon>
      <span class="q-ml-md">mdi-code-array</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-code-braces"></q-icon>
      <span class="q-ml-md">mdi-code-braces</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-code-brackets"></q-icon>
      <span class="q-ml-md">mdi-code-brackets</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-code-equal"></q-icon>
      <span class="q-ml-md">mdi-code-equal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-code-greater-than"></q-icon>
      <span class="q-ml-md">mdi-code-greater-than</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-code-greater-than-or-equal"></q-icon>
      <span class="q-ml-md">mdi-code-greater-than-or-equal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-code-less-than"></q-icon>
      <span class="q-ml-md">mdi-code-less-than</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-code-less-than-or-equal"></q-icon>
      <span class="q-ml-md">mdi-code-less-than-or-equal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-code-not-equal"></q-icon>
      <span class="q-ml-md">mdi-code-not-equal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-code-not-equal-variant"></q-icon>
      <span class="q-ml-md">mdi-code-not-equal-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-code-parentheses"></q-icon>
      <span class="q-ml-md">mdi-code-parentheses</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-code-string"></q-icon>
      <span class="q-ml-md">mdi-code-string</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-code-tags"></q-icon>
      <span class="q-ml-md">mdi-code-tags</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-code-tags-check"></q-icon>
      <span class="q-ml-md">mdi-code-tags-check</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-codepen"></q-icon>
      <span class="q-ml-md">mdi-codepen</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-coffee"></q-icon>
      <span class="q-ml-md">mdi-coffee</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-coffee-outline"></q-icon>
      <span class="q-ml-md">mdi-coffee-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-coffee-to-go"></q-icon>
      <span class="q-ml-md">mdi-coffee-to-go</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cogs"></q-icon>
      <span class="q-ml-md">mdi-cogs</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-coin"></q-icon>
      <span class="q-ml-md">mdi-coin</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-coins"></q-icon>
      <span class="q-ml-md">mdi-coins</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-collage"></q-icon>
      <span class="q-ml-md">mdi-collage</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-color-helper"></q-icon>
      <span class="q-ml-md">mdi-color-helper</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment"></q-icon>
      <span class="q-ml-md">mdi-comment</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-account"></q-icon>
      <span class="q-ml-md">mdi-comment-account</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-account-outline"></q-icon>
      <span class="q-ml-md">mdi-comment-account-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-alert"></q-icon>
      <span class="q-ml-md">mdi-comment-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-alert-outline"></q-icon>
      <span class="q-ml-md">mdi-comment-alert-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-arrow-left"></q-icon>
      <span class="q-ml-md">mdi-comment-arrow-left</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-arrow-left-outline"></q-icon>
      <span class="q-ml-md">mdi-comment-arrow-left-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-arrow-right"></q-icon>
      <span class="q-ml-md">mdi-comment-arrow-right</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-arrow-right-outline"></q-icon>
      <span class="q-ml-md">mdi-comment-arrow-right-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-check"></q-icon>
      <span class="q-ml-md">mdi-comment-check</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-check-outline"></q-icon>
      <span class="q-ml-md">mdi-comment-check-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-eye"></q-icon>
      <span class="q-ml-md">mdi-comment-eye</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-eye-outline"></q-icon>
      <span class="q-ml-md">mdi-comment-eye-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-multiple"></q-icon>
      <span class="q-ml-md">mdi-comment-multiple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-multiple-outline"></q-icon>
      <span class="q-ml-md">mdi-comment-multiple-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-outline"></q-icon>
      <span class="q-ml-md">mdi-comment-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-plus"></q-icon>
      <span class="q-ml-md">mdi-comment-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-plus-outline"></q-icon>
      <span class="q-ml-md">mdi-comment-plus-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-processing"></q-icon>
      <span class="q-ml-md">mdi-comment-processing</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-processing-outline"></q-icon>
      <span class="q-ml-md">mdi-comment-processing-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-question"></q-icon>
      <span class="q-ml-md">mdi-comment-question</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-question-outline"></q-icon>
      <span class="q-ml-md">mdi-comment-question-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-remove"></q-icon>
      <span class="q-ml-md">mdi-comment-remove</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-remove-outline"></q-icon>
      <span class="q-ml-md">mdi-comment-remove-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-search"></q-icon>
      <span class="q-ml-md">mdi-comment-search</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-search-outline"></q-icon>
      <span class="q-ml-md">mdi-comment-search-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-text"></q-icon>
      <span class="q-ml-md">mdi-comment-text</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-text-multiple"></q-icon>
      <span class="q-ml-md">mdi-comment-text-multiple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-text-multiple-outline"></q-icon>
      <span class="q-ml-md">mdi-comment-text-multiple-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-comment-text-outline"></q-icon>
      <span class="q-ml-md">mdi-comment-text-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-compare"></q-icon>
      <span class="q-ml-md">mdi-compare</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-compass"></q-icon>
      <span class="q-ml-md">mdi-compass</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-compass-outline"></q-icon>
      <span class="q-ml-md">mdi-compass-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-console"></q-icon>
      <span class="q-ml-md">mdi-console</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-console-line"></q-icon>
      <span class="q-ml-md">mdi-console-line</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-console-network"></q-icon>
      <span class="q-ml-md">mdi-console-network</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-contact-mail"></q-icon>
      <span class="q-ml-md">mdi-contact-mail</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-contacts"></q-icon>
      <span class="q-ml-md">mdi-contacts</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-contain"></q-icon>
      <span class="q-ml-md">mdi-contain</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-contain-end"></q-icon>
      <span class="q-ml-md">mdi-contain-end</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-contain-start"></q-icon>
      <span class="q-ml-md">mdi-contain-start</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-content-copy"></q-icon>
      <span class="q-ml-md">mdi-content-copy</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-content-cut"></q-icon>
      <span class="q-ml-md">mdi-content-cut</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-content-duplicate"></q-icon>
      <span class="q-ml-md">mdi-content-duplicate</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-content-paste"></q-icon>
      <span class="q-ml-md">mdi-content-paste</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-content-save"></q-icon>
      <span class="q-ml-md">mdi-content-save</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-content-save-all"></q-icon>
      <span class="q-ml-md">mdi-content-save-all</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-content-save-outline"></q-icon>
      <span class="q-ml-md">mdi-content-save-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-content-save-settings"></q-icon>
      <span class="q-ml-md">mdi-content-save-settings</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-contrast"></q-icon>
      <span class="q-ml-md">mdi-contrast</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-contrast-box"></q-icon>
      <span class="q-ml-md">mdi-contrast-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-contrast-circle"></q-icon>
      <span class="q-ml-md">mdi-contrast-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cookie"></q-icon>
      <span class="q-ml-md">mdi-cookie</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-copyright"></q-icon>
      <span class="q-ml-md">mdi-copyright</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cordova"></q-icon>
      <span class="q-ml-md">mdi-cordova</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-corn"></q-icon>
      <span class="q-ml-md">mdi-corn</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-counter"></q-icon>
      <span class="q-ml-md">mdi-counter</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cow"></q-icon>
      <span class="q-ml-md">mdi-cow</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-crane"></q-icon>
      <span class="q-ml-md">mdi-crane</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-creation"></q-icon>
      <span class="q-ml-md">mdi-creation</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-credit-card"></q-icon>
      <span class="q-ml-md">mdi-credit-card</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-credit-card-multiple"></q-icon>
      <span class="q-ml-md">mdi-credit-card-multiple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-credit-card-off"></q-icon>
      <span class="q-ml-md">mdi-credit-card-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-credit-card-plus"></q-icon>
      <span class="q-ml-md">mdi-credit-card-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-credit-card-scan"></q-icon>
      <span class="q-ml-md">mdi-credit-card-scan</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-credit-card-settings"></q-icon>
      <span class="q-ml-md">mdi-credit-card-settings</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-crop"></q-icon>
      <span class="q-ml-md">mdi-crop</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-crop-free"></q-icon>
      <span class="q-ml-md">mdi-crop-free</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-crop-landscape"></q-icon>
      <span class="q-ml-md">mdi-crop-landscape</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-crop-portrait"></q-icon>
      <span class="q-ml-md">mdi-crop-portrait</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-crop-rotate"></q-icon>
      <span class="q-ml-md">mdi-crop-rotate</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-crop-square"></q-icon>
      <span class="q-ml-md">mdi-crop-square</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-crosshairs"></q-icon>
      <span class="q-ml-md">mdi-crosshairs</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-crosshairs-gps"></q-icon>
      <span class="q-ml-md">mdi-crosshairs-gps</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-crown"></q-icon>
      <span class="q-ml-md">mdi-crown</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cryengine"></q-icon>
      <span class="q-ml-md">mdi-cryengine</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cube"></q-icon>
      <span class="q-ml-md">mdi-cube</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cube-outline"></q-icon>
      <span class="q-ml-md">mdi-cube-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cube-send"></q-icon>
      <span class="q-ml-md">mdi-cube-send</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cube-unfolded"></q-icon>
      <span class="q-ml-md">mdi-cube-unfolded</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cup"></q-icon>
      <span class="q-ml-md">mdi-cup</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cup-off"></q-icon>
      <span class="q-ml-md">mdi-cup-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cup-water"></q-icon>
      <span class="q-ml-md">mdi-cup-water</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cupcake"></q-icon>
      <span class="q-ml-md">mdi-cupcake</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-curling"></q-icon>
      <span class="q-ml-md">mdi-curling</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-currency-bdt"></q-icon>
      <span class="q-ml-md">mdi-currency-bdt</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-currency-btc"></q-icon>
      <span class="q-ml-md">mdi-currency-btc</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-currency-chf"></q-icon>
      <span class="q-ml-md">mdi-currency-chf</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-currency-cny"></q-icon>
      <span class="q-ml-md">mdi-currency-cny</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-currency-eth"></q-icon>
      <span class="q-ml-md">mdi-currency-eth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-currency-eur"></q-icon>
      <span class="q-ml-md">mdi-currency-eur</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-currency-gbp"></q-icon>
      <span class="q-ml-md">mdi-currency-gbp</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-currency-inr"></q-icon>
      <span class="q-ml-md">mdi-currency-inr</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-currency-jpy"></q-icon>
      <span class="q-ml-md">mdi-currency-jpy</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-currency-krw"></q-icon>
      <span class="q-ml-md">mdi-currency-krw</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-currency-kzt"></q-icon>
      <span class="q-ml-md">mdi-currency-kzt</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-currency-ngn"></q-icon>
      <span class="q-ml-md">mdi-currency-ngn</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-currency-php"></q-icon>
      <span class="q-ml-md">mdi-currency-php</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-currency-rub"></q-icon>
      <span class="q-ml-md">mdi-currency-rub</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-currency-sign"></q-icon>
      <span class="q-ml-md">mdi-currency-sign</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-currency-try"></q-icon>
      <span class="q-ml-md">mdi-currency-try</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-currency-twd"></q-icon>
      <span class="q-ml-md">mdi-currency-twd</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-currency-usd"></q-icon>
      <span class="q-ml-md">mdi-currency-usd</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-currency-usd-off"></q-icon>
      <span class="q-ml-md">mdi-currency-usd-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-current-ac"></q-icon>
      <span class="q-ml-md">mdi-current-ac</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-current-dc"></q-icon>
      <span class="q-ml-md">mdi-current-dc</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cursor-default"></q-icon>
      <span class="q-ml-md">mdi-cursor-default</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cursor-default-outline"></q-icon>
      <span class="q-ml-md">mdi-cursor-default-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cursor-move"></q-icon>
      <span class="q-ml-md">mdi-cursor-move</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cursor-pointer"></q-icon>
      <span class="q-ml-md">mdi-cursor-pointer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-cursor-text"></q-icon>
      <span class="q-ml-md">mdi-cursor-text</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-database"></q-icon>
      <span class="q-ml-md">mdi-database</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-database-export"></q-icon>
      <span class="q-ml-md">mdi-database-export</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-database-import"></q-icon>
      <span class="q-ml-md">mdi-database-import</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-database-minus"></q-icon>
      <span class="q-ml-md">mdi-database-minus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-database-plus"></q-icon>
      <span class="q-ml-md">mdi-database-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-database-search"></q-icon>
      <span class="q-ml-md">mdi-database-search</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-death-star"></q-icon>
      <span class="q-ml-md">mdi-death-star</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-death-star-variant"></q-icon>
      <span class="q-ml-md">mdi-death-star-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-debian"></q-icon>
      <span class="q-ml-md">mdi-debian</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-debug-step-into"></q-icon>
      <span class="q-ml-md">mdi-debug-step-into</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-debug-step-out"></q-icon>
      <span class="q-ml-md">mdi-debug-step-out</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-debug-step-over"></q-icon>
      <span class="q-ml-md">mdi-debug-step-over</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-decagram"></q-icon>
      <span class="q-ml-md">mdi-decagram</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-decagram-outline"></q-icon>
      <span class="q-ml-md">mdi-decagram-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-decimal-decrease"></q-icon>
      <span class="q-ml-md">mdi-decimal-decrease</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-decimal-increase"></q-icon>
      <span class="q-ml-md">mdi-decimal-increase</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-delete"></q-icon>
      <span class="q-ml-md">mdi-delete</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-delete-circle"></q-icon>
      <span class="q-ml-md">mdi-delete-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-delete-empty"></q-icon>
      <span class="q-ml-md">mdi-delete-empty</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-delete-forever"></q-icon>
      <span class="q-ml-md">mdi-delete-forever</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-delete-outline"></q-icon>
      <span class="q-ml-md">mdi-delete-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-delete-restore"></q-icon>
      <span class="q-ml-md">mdi-delete-restore</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-delete-sweep"></q-icon>
      <span class="q-ml-md">mdi-delete-sweep</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-delete-variant"></q-icon>
      <span class="q-ml-md">mdi-delete-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-delta"></q-icon>
      <span class="q-ml-md">mdi-delta</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-desk-lamp"></q-icon>
      <span class="q-ml-md">mdi-desk-lamp</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-deskphone"></q-icon>
      <span class="q-ml-md">mdi-deskphone</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-desktop-classic"></q-icon>
      <span class="q-ml-md">mdi-desktop-classic</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-desktop-mac"></q-icon>
      <span class="q-ml-md">mdi-desktop-mac</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-desktop-mac-dashboard"></q-icon>
      <span class="q-ml-md">mdi-desktop-mac-dashboard</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-desktop-tower"></q-icon>
      <span class="q-ml-md">mdi-desktop-tower</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-details"></q-icon>
      <span class="q-ml-md">mdi-details</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-developer-board"></q-icon>
      <span class="q-ml-md">mdi-developer-board</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-deviantart"></q-icon>
      <span class="q-ml-md">mdi-deviantart</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dialpad"></q-icon>
      <span class="q-ml-md">mdi-dialpad</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-diamond"></q-icon>
      <span class="q-ml-md">mdi-diamond</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dice-1"></q-icon>
      <span class="q-ml-md">mdi-dice-1</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dice-2"></q-icon>
      <span class="q-ml-md">mdi-dice-2</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dice-3"></q-icon>
      <span class="q-ml-md">mdi-dice-3</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dice-4"></q-icon>
      <span class="q-ml-md">mdi-dice-4</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dice-5"></q-icon>
      <span class="q-ml-md">mdi-dice-5</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dice-6"></q-icon>
      <span class="q-ml-md">mdi-dice-6</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dice-d10"></q-icon>
      <span class="q-ml-md">mdi-dice-d10</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dice-d12"></q-icon>
      <span class="q-ml-md">mdi-dice-d12</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dice-d20"></q-icon>
      <span class="q-ml-md">mdi-dice-d20</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dice-d4"></q-icon>
      <span class="q-ml-md">mdi-dice-d4</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dice-d6"></q-icon>
      <span class="q-ml-md">mdi-dice-d6</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dice-d8"></q-icon>
      <span class="q-ml-md">mdi-dice-d8</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dice-multiple"></q-icon>
      <span class="q-ml-md">mdi-dice-multiple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dictionary"></q-icon>
      <span class="q-ml-md">mdi-dictionary</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dip-switch"></q-icon>
      <span class="q-ml-md">mdi-dip-switch</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-directions"></q-icon>
      <span class="q-ml-md">mdi-directions</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-directions-fork"></q-icon>
      <span class="q-ml-md">mdi-directions-fork</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-disc"></q-icon>
      <span class="q-ml-md">mdi-disc</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-disc-alert"></q-icon>
      <span class="q-ml-md">mdi-disc-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-disc-player"></q-icon>
      <span class="q-ml-md">mdi-disc-player</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-discord"></q-icon>
      <span class="q-ml-md">mdi-discord</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-disqus"></q-icon>
      <span class="q-ml-md">mdi-disqus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-disqus-outline"></q-icon>
      <span class="q-ml-md">mdi-disqus-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-division"></q-icon>
      <span class="q-ml-md">mdi-division</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-division-box"></q-icon>
      <span class="q-ml-md">mdi-division-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dlna"></q-icon>
      <span class="q-ml-md">mdi-dlna</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dna"></q-icon>
      <span class="q-ml-md">mdi-dna</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dns"></q-icon>
      <span class="q-ml-md">mdi-dns</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-do-not-disturb"></q-icon>
      <span class="q-ml-md">mdi-do-not-disturb</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-do-not-disturb-off"></q-icon>
      <span class="q-ml-md">mdi-do-not-disturb-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-docker"></q-icon>
      <span class="q-ml-md">mdi-docker</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-doctor"></q-icon>
      <span class="q-ml-md">mdi-doctor</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dog"></q-icon>
      <span class="q-ml-md">mdi-dog</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dog-side"></q-icon>
      <span class="q-ml-md">mdi-dog-side</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dolby"></q-icon>
      <span class="q-ml-md">mdi-dolby</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-domain"></q-icon>
      <span class="q-ml-md">mdi-domain</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-donkey"></q-icon>
      <span class="q-ml-md">mdi-donkey</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-door"></q-icon>
      <span class="q-ml-md">mdi-door</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-door-closed"></q-icon>
      <span class="q-ml-md">mdi-door-closed</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-door-open"></q-icon>
      <span class="q-ml-md">mdi-door-open</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-doorbell-video"></q-icon>
      <span class="q-ml-md">mdi-doorbell-video</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dots-horizontal"></q-icon>
      <span class="q-ml-md">mdi-dots-horizontal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dots-horizontal-circle"></q-icon>
      <span class="q-ml-md">mdi-dots-horizontal-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dots-vertical"></q-icon>
      <span class="q-ml-md">mdi-dots-vertical</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dots-vertical-circle"></q-icon>
      <span class="q-ml-md">mdi-dots-vertical-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-douban"></q-icon>
      <span class="q-ml-md">mdi-douban</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-download"></q-icon>
      <span class="q-ml-md">mdi-download</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-download-multiple"></q-icon>
      <span class="q-ml-md">mdi-download-multiple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-download-network"></q-icon>
      <span class="q-ml-md">mdi-download-network</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-drag"></q-icon>
      <span class="q-ml-md">mdi-drag</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-drag-horizontal"></q-icon>
      <span class="q-ml-md">mdi-drag-horizontal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-drag-vertical"></q-icon>
      <span class="q-ml-md">mdi-drag-vertical</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-drawing"></q-icon>
      <span class="q-ml-md">mdi-drawing</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-drawing-box"></q-icon>
      <span class="q-ml-md">mdi-drawing-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dribbble"></q-icon>
      <span class="q-ml-md">mdi-dribbble</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dribbble-box"></q-icon>
      <span class="q-ml-md">mdi-dribbble-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-drone"></q-icon>
      <span class="q-ml-md">mdi-drone</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dropbox"></q-icon>
      <span class="q-ml-md">mdi-dropbox</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-drupal"></q-icon>
      <span class="q-ml-md">mdi-drupal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-duck"></q-icon>
      <span class="q-ml-md">mdi-duck</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-dumbbell"></q-icon>
      <span class="q-ml-md">mdi-dumbbell</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ear-hearing"></q-icon>
      <span class="q-ml-md">mdi-ear-hearing</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ear-hearing-off"></q-icon>
      <span class="q-ml-md">mdi-ear-hearing-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-earth"></q-icon>
      <span class="q-ml-md">mdi-earth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-earth-box"></q-icon>
      <span class="q-ml-md">mdi-earth-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-earth-box-off"></q-icon>
      <span class="q-ml-md">mdi-earth-box-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-earth-off"></q-icon>
      <span class="q-ml-md">mdi-earth-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-edge"></q-icon>
      <span class="q-ml-md">mdi-edge</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-eight-track"></q-icon>
      <span class="q-ml-md">mdi-eight-track</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-eject"></q-icon>
      <span class="q-ml-md">mdi-eject</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-elephant"></q-icon>
      <span class="q-ml-md">mdi-elephant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-elevation-decline"></q-icon>
      <span class="q-ml-md">mdi-elevation-decline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-elevation-rise"></q-icon>
      <span class="q-ml-md">mdi-elevation-rise</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-elevator"></q-icon>
      <span class="q-ml-md">mdi-elevator</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-email"></q-icon>
      <span class="q-ml-md">mdi-email</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-email-alert"></q-icon>
      <span class="q-ml-md">mdi-email-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-email-open"></q-icon>
      <span class="q-ml-md">mdi-email-open</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-email-open-outline"></q-icon>
      <span class="q-ml-md">mdi-email-open-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-email-outline"></q-icon>
      <span class="q-ml-md">mdi-email-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-email-plus"></q-icon>
      <span class="q-ml-md">mdi-email-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-email-plus-outline"></q-icon>
      <span class="q-ml-md">mdi-email-plus-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-email-search"></q-icon>
      <span class="q-ml-md">mdi-email-search</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-email-search-outline"></q-icon>
      <span class="q-ml-md">mdi-email-search-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-email-secure"></q-icon>
      <span class="q-ml-md">mdi-email-secure</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-email-variant"></q-icon>
      <span class="q-ml-md">mdi-email-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-emby"></q-icon>
      <span class="q-ml-md">mdi-emby</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-emoticon"></q-icon>
      <span class="q-ml-md">mdi-emoticon</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-emoticon-cool"></q-icon>
      <span class="q-ml-md">mdi-emoticon-cool</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-emoticon-dead"></q-icon>
      <span class="q-ml-md">mdi-emoticon-dead</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-emoticon-devil"></q-icon>
      <span class="q-ml-md">mdi-emoticon-devil</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-emoticon-excited"></q-icon>
      <span class="q-ml-md">mdi-emoticon-excited</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-emoticon-happy"></q-icon>
      <span class="q-ml-md">mdi-emoticon-happy</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-emoticon-neutral"></q-icon>
      <span class="q-ml-md">mdi-emoticon-neutral</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-emoticon-poop"></q-icon>
      <span class="q-ml-md">mdi-emoticon-poop</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-emoticon-sad"></q-icon>
      <span class="q-ml-md">mdi-emoticon-sad</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-emoticon-tongue"></q-icon>
      <span class="q-ml-md">mdi-emoticon-tongue</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-engine"></q-icon>
      <span class="q-ml-md">mdi-engine</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-engine-off"></q-icon>
      <span class="q-ml-md">mdi-engine-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-engine-off-outline"></q-icon>
      <span class="q-ml-md">mdi-engine-off-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-engine-outline"></q-icon>
      <span class="q-ml-md">mdi-engine-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-equal"></q-icon>
      <span class="q-ml-md">mdi-equal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-equal-box"></q-icon>
      <span class="q-ml-md">mdi-equal-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-eraser"></q-icon>
      <span class="q-ml-md">mdi-eraser</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-eraser-variant"></q-icon>
      <span class="q-ml-md">mdi-eraser-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-escalator"></q-icon>
      <span class="q-ml-md">mdi-escalator</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ethereum"></q-icon>
      <span class="q-ml-md">mdi-ethereum</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ethernet"></q-icon>
      <span class="q-ml-md">mdi-ethernet</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ethernet-cable"></q-icon>
      <span class="q-ml-md">mdi-ethernet-cable</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ethernet-cable-off"></q-icon>
      <span class="q-ml-md">mdi-ethernet-cable-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-etsy"></q-icon>
      <span class="q-ml-md">mdi-etsy</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ev-station"></q-icon>
      <span class="q-ml-md">mdi-ev-station</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-eventbrite"></q-icon>
      <span class="q-ml-md">mdi-eventbrite</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-evernote"></q-icon>
      <span class="q-ml-md">mdi-evernote</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-exclamation"></q-icon>
      <span class="q-ml-md">mdi-exclamation</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-exit-run"></q-icon>
      <span class="q-ml-md">mdi-exit-run</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-exit-to-app"></q-icon>
      <span class="q-ml-md">mdi-exit-to-app</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-exponent"></q-icon>
      <span class="q-ml-md">mdi-exponent</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-exponent-box"></q-icon>
      <span class="q-ml-md">mdi-exponent-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-export"></q-icon>
      <span class="q-ml-md">mdi-export</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-eye"></q-icon>
      <span class="q-ml-md">mdi-eye</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-eye-off"></q-icon>
      <span class="q-ml-md">mdi-eye-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-eye-off-outline"></q-icon>
      <span class="q-ml-md">mdi-eye-off-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-eye-outline"></q-icon>
      <span class="q-ml-md">mdi-eye-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-eye-plus"></q-icon>
      <span class="q-ml-md">mdi-eye-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-eye-plus-outline"></q-icon>
      <span class="q-ml-md">mdi-eye-plus-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-eye-settings"></q-icon>
      <span class="q-ml-md">mdi-eye-settings</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-eye-settings-outline"></q-icon>
      <span class="q-ml-md">mdi-eye-settings-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-eyedropper"></q-icon>
      <span class="q-ml-md">mdi-eyedropper</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-eyedropper-variant"></q-icon>
      <span class="q-ml-md">mdi-eyedropper-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-face"></q-icon>
      <span class="q-ml-md">mdi-face</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-face-profile"></q-icon>
      <span class="q-ml-md">mdi-face-profile</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-facebook"></q-icon>
      <span class="q-ml-md">mdi-facebook</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-facebook-box"></q-icon>
      <span class="q-ml-md">mdi-facebook-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-facebook-messenger"></q-icon>
      <span class="q-ml-md">mdi-facebook-messenger</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-factory"></q-icon>
      <span class="q-ml-md">mdi-factory</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-fan"></q-icon>
      <span class="q-ml-md">mdi-fan</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-fan-off"></q-icon>
      <span class="q-ml-md">mdi-fan-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-fast-forward"></q-icon>
      <span class="q-ml-md">mdi-fast-forward</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-fast-forward-outline"></q-icon>
      <span class="q-ml-md">mdi-fast-forward-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-fax"></q-icon>
      <span class="q-ml-md">mdi-fax</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-feather"></q-icon>
      <span class="q-ml-md">mdi-feather</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-feature-search"></q-icon>
      <span class="q-ml-md">mdi-feature-search</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-feature-search-outline"></q-icon>
      <span class="q-ml-md">mdi-feature-search-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-fedora"></q-icon>
      <span class="q-ml-md">mdi-fedora</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ferry"></q-icon>
      <span class="q-ml-md">mdi-ferry</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file"></q-icon>
      <span class="q-ml-md">mdi-file</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-account"></q-icon>
      <span class="q-ml-md">mdi-file-account</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-alert"></q-icon>
      <span class="q-ml-md">mdi-file-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-alert-outline"></q-icon>
      <span class="q-ml-md">mdi-file-alert-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-chart"></q-icon>
      <span class="q-ml-md">mdi-file-chart</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-check"></q-icon>
      <span class="q-ml-md">mdi-file-check</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-cloud"></q-icon>
      <span class="q-ml-md">mdi-file-cloud</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-compare"></q-icon>
      <span class="q-ml-md">mdi-file-compare</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-delimited"></q-icon>
      <span class="q-ml-md">mdi-file-delimited</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-document"></q-icon>
      <span class="q-ml-md">mdi-file-document</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-document-box"></q-icon>
      <span class="q-ml-md">mdi-file-document-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-document-box-outline"></q-icon>
      <span class="q-ml-md">mdi-file-document-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-document-outline"></q-icon>
      <span class="q-ml-md">mdi-file-document-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-download"></q-icon>
      <span class="q-ml-md">mdi-file-download</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-download-outline"></q-icon>
      <span class="q-ml-md">mdi-file-download-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-excel"></q-icon>
      <span class="q-ml-md">mdi-file-excel</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-excel-box"></q-icon>
      <span class="q-ml-md">mdi-file-excel-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-export"></q-icon>
      <span class="q-ml-md">mdi-file-export</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-find"></q-icon>
      <span class="q-ml-md">mdi-file-find</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-hidden"></q-icon>
      <span class="q-ml-md">mdi-file-hidden</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-image"></q-icon>
      <span class="q-ml-md">mdi-file-image</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-import"></q-icon>
      <span class="q-ml-md">mdi-file-import</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-lock"></q-icon>
      <span class="q-ml-md">mdi-file-lock</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-multiple"></q-icon>
      <span class="q-ml-md">mdi-file-multiple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-music"></q-icon>
      <span class="q-ml-md">mdi-file-music</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-outline"></q-icon>
      <span class="q-ml-md">mdi-file-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-pdf"></q-icon>
      <span class="q-ml-md">mdi-file-pdf</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-pdf-box"></q-icon>
      <span class="q-ml-md">mdi-file-pdf-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-percent"></q-icon>
      <span class="q-ml-md">mdi-file-percent</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-plus"></q-icon>
      <span class="q-ml-md">mdi-file-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-powerpoint"></q-icon>
      <span class="q-ml-md">mdi-file-powerpoint</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-powerpoint-box"></q-icon>
      <span class="q-ml-md">mdi-file-powerpoint-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-presentation-box"></q-icon>
      <span class="q-ml-md">mdi-file-presentation-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-question"></q-icon>
      <span class="q-ml-md">mdi-file-question</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-restore"></q-icon>
      <span class="q-ml-md">mdi-file-restore</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-send"></q-icon>
      <span class="q-ml-md">mdi-file-send</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-tree"></q-icon>
      <span class="q-ml-md">mdi-file-tree</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-undo"></q-icon>
      <span class="q-ml-md">mdi-file-undo</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-upload"></q-icon>
      <span class="q-ml-md">mdi-file-upload</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-upload-outline"></q-icon>
      <span class="q-ml-md">mdi-file-upload-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-video"></q-icon>
      <span class="q-ml-md">mdi-file-video</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-word"></q-icon>
      <span class="q-ml-md">mdi-file-word</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-word-box"></q-icon>
      <span class="q-ml-md">mdi-file-word-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-file-xml"></q-icon>
      <span class="q-ml-md">mdi-file-xml</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-film"></q-icon>
      <span class="q-ml-md">mdi-film</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-filmstrip"></q-icon>
      <span class="q-ml-md">mdi-filmstrip</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-filmstrip-off"></q-icon>
      <span class="q-ml-md">mdi-filmstrip-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-filter"></q-icon>
      <span class="q-ml-md">mdi-filter</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-filter-outline"></q-icon>
      <span class="q-ml-md">mdi-filter-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-filter-remove"></q-icon>
      <span class="q-ml-md">mdi-filter-remove</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-filter-remove-outline"></q-icon>
      <span class="q-ml-md">mdi-filter-remove-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-filter-variant"></q-icon>
      <span class="q-ml-md">mdi-filter-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-finance"></q-icon>
      <span class="q-ml-md">mdi-finance</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-find-replace"></q-icon>
      <span class="q-ml-md">mdi-find-replace</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-fingerprint"></q-icon>
      <span class="q-ml-md">mdi-fingerprint</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-fire"></q-icon>
      <span class="q-ml-md">mdi-fire</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-fire-truck"></q-icon>
      <span class="q-ml-md">mdi-fire-truck</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-firebase"></q-icon>
      <span class="q-ml-md">mdi-firebase</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-firefox"></q-icon>
      <span class="q-ml-md">mdi-firefox</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-fish"></q-icon>
      <span class="q-ml-md">mdi-fish</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flag"></q-icon>
      <span class="q-ml-md">mdi-flag</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flag-checkered"></q-icon>
      <span class="q-ml-md">mdi-flag-checkered</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flag-outline"></q-icon>
      <span class="q-ml-md">mdi-flag-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flag-triangle"></q-icon>
      <span class="q-ml-md">mdi-flag-triangle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flag-variant"></q-icon>
      <span class="q-ml-md">mdi-flag-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flag-variant-outline"></q-icon>
      <span class="q-ml-md">mdi-flag-variant-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flash"></q-icon>
      <span class="q-ml-md">mdi-flash</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flash-auto"></q-icon>
      <span class="q-ml-md">mdi-flash-auto</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flash-circle"></q-icon>
      <span class="q-ml-md">mdi-flash-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flash-off"></q-icon>
      <span class="q-ml-md">mdi-flash-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flash-outline"></q-icon>
      <span class="q-ml-md">mdi-flash-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flash-red-eye"></q-icon>
      <span class="q-ml-md">mdi-flash-red-eye</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flashlight"></q-icon>
      <span class="q-ml-md">mdi-flashlight</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flashlight-off"></q-icon>
      <span class="q-ml-md">mdi-flashlight-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flask"></q-icon>
      <span class="q-ml-md">mdi-flask</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flask-empty"></q-icon>
      <span class="q-ml-md">mdi-flask-empty</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flask-empty-outline"></q-icon>
      <span class="q-ml-md">mdi-flask-empty-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flask-outline"></q-icon>
      <span class="q-ml-md">mdi-flask-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flattr"></q-icon>
      <span class="q-ml-md">mdi-flattr</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flip-to-back"></q-icon>
      <span class="q-ml-md">mdi-flip-to-back</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flip-to-front"></q-icon>
      <span class="q-ml-md">mdi-flip-to-front</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-floor-lamp"></q-icon>
      <span class="q-ml-md">mdi-floor-lamp</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-floor-plan"></q-icon>
      <span class="q-ml-md">mdi-floor-plan</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-floppy"></q-icon>
      <span class="q-ml-md">mdi-floppy</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-floppy-variant"></q-icon>
      <span class="q-ml-md">mdi-floppy-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flower"></q-icon>
      <span class="q-ml-md">mdi-flower</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flower-outline"></q-icon>
      <span class="q-ml-md">mdi-flower-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flower-tulip"></q-icon>
      <span class="q-ml-md">mdi-flower-tulip</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-flower-tulip-outline"></q-icon>
      <span class="q-ml-md">mdi-flower-tulip-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-folder"></q-icon>
      <span class="q-ml-md">mdi-folder</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-folder-account"></q-icon>
      <span class="q-ml-md">mdi-folder-account</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-folder-download"></q-icon>
      <span class="q-ml-md">mdi-folder-download</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-folder-edit"></q-icon>
      <span class="q-ml-md">mdi-folder-edit</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-folder-google-drive"></q-icon>
      <span class="q-ml-md">mdi-folder-google-drive</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-folder-image"></q-icon>
      <span class="q-ml-md">mdi-folder-image</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-folder-key"></q-icon>
      <span class="q-ml-md">mdi-folder-key</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-folder-key-network"></q-icon>
      <span class="q-ml-md">mdi-folder-key-network</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-folder-lock"></q-icon>
      <span class="q-ml-md">mdi-folder-lock</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-folder-lock-open"></q-icon>
      <span class="q-ml-md">mdi-folder-lock-open</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-folder-move"></q-icon>
      <span class="q-ml-md">mdi-folder-move</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-folder-multiple"></q-icon>
      <span class="q-ml-md">mdi-folder-multiple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-folder-multiple-image"></q-icon>
      <span class="q-ml-md">mdi-folder-multiple-image</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-folder-multiple-outline"></q-icon>
      <span class="q-ml-md">mdi-folder-multiple-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-folder-network"></q-icon>
      <span class="q-ml-md">mdi-folder-network</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-folder-open"></q-icon>
      <span class="q-ml-md">mdi-folder-open</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-folder-outline"></q-icon>
      <span class="q-ml-md">mdi-folder-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-folder-plus"></q-icon>
      <span class="q-ml-md">mdi-folder-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-folder-remove"></q-icon>
      <span class="q-ml-md">mdi-folder-remove</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-folder-search"></q-icon>
      <span class="q-ml-md">mdi-folder-search</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-folder-search-outline"></q-icon>
      <span class="q-ml-md">mdi-folder-search-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-folder-star"></q-icon>
      <span class="q-ml-md">mdi-folder-star</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-folder-upload"></q-icon>
      <span class="q-ml-md">mdi-folder-upload</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-font-awesome"></q-icon>
      <span class="q-ml-md">mdi-font-awesome</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-food"></q-icon>
      <span class="q-ml-md">mdi-food</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-food-apple"></q-icon>
      <span class="q-ml-md">mdi-food-apple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-food-croissant"></q-icon>
      <span class="q-ml-md">mdi-food-croissant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-food-fork-drink"></q-icon>
      <span class="q-ml-md">mdi-food-fork-drink</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-food-off"></q-icon>
      <span class="q-ml-md">mdi-food-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-food-variant"></q-icon>
      <span class="q-ml-md">mdi-food-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-football"></q-icon>
      <span class="q-ml-md">mdi-football</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-football-australian"></q-icon>
      <span class="q-ml-md">mdi-football-australian</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-football-helmet"></q-icon>
      <span class="q-ml-md">mdi-football-helmet</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-forklift"></q-icon>
      <span class="q-ml-md">mdi-forklift</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-align-bottom"></q-icon>
      <span class="q-ml-md">mdi-format-align-bottom</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-align-center"></q-icon>
      <span class="q-ml-md">mdi-format-align-center</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-align-justify"></q-icon>
      <span class="q-ml-md">mdi-format-align-justify</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-align-left"></q-icon>
      <span class="q-ml-md">mdi-format-align-left</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-align-middle"></q-icon>
      <span class="q-ml-md">mdi-format-align-middle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-align-right"></q-icon>
      <span class="q-ml-md">mdi-format-align-right</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-align-top"></q-icon>
      <span class="q-ml-md">mdi-format-align-top</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-annotation-plus"></q-icon>
      <span class="q-ml-md">mdi-format-annotation-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-bold"></q-icon>
      <span class="q-ml-md">mdi-format-bold</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-clear"></q-icon>
      <span class="q-ml-md">mdi-format-clear</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-color-fill"></q-icon>
      <span class="q-ml-md">mdi-format-color-fill</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-color-text"></q-icon>
      <span class="q-ml-md">mdi-format-color-text</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-columns"></q-icon>
      <span class="q-ml-md">mdi-format-columns</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-float-center"></q-icon>
      <span class="q-ml-md">mdi-format-float-center</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-float-left"></q-icon>
      <span class="q-ml-md">mdi-format-float-left</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-float-none"></q-icon>
      <span class="q-ml-md">mdi-format-float-none</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-float-right"></q-icon>
      <span class="q-ml-md">mdi-format-float-right</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-font"></q-icon>
      <span class="q-ml-md">mdi-format-font</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-font-size-decrease"></q-icon>
      <span class="q-ml-md">mdi-format-font-size-decrease</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-font-size-increase"></q-icon>
      <span class="q-ml-md">mdi-format-font-size-increase</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-header-1"></q-icon>
      <span class="q-ml-md">mdi-format-header-1</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-header-2"></q-icon>
      <span class="q-ml-md">mdi-format-header-2</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-header-3"></q-icon>
      <span class="q-ml-md">mdi-format-header-3</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-header-4"></q-icon>
      <span class="q-ml-md">mdi-format-header-4</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-header-5"></q-icon>
      <span class="q-ml-md">mdi-format-header-5</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-header-6"></q-icon>
      <span class="q-ml-md">mdi-format-header-6</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-header-decrease"></q-icon>
      <span class="q-ml-md">mdi-format-header-decrease</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-header-equal"></q-icon>
      <span class="q-ml-md">mdi-format-header-equal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-header-increase"></q-icon>
      <span class="q-ml-md">mdi-format-header-increase</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-header-pound"></q-icon>
      <span class="q-ml-md">mdi-format-header-pound</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-horizontal-align-center"></q-icon>
      <span class="q-ml-md">mdi-format-horizontal-align-center</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-horizontal-align-left"></q-icon>
      <span class="q-ml-md">mdi-format-horizontal-align-left</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-horizontal-align-right"></q-icon>
      <span class="q-ml-md">mdi-format-horizontal-align-right</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-indent-decrease"></q-icon>
      <span class="q-ml-md">mdi-format-indent-decrease</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-indent-increase"></q-icon>
      <span class="q-ml-md">mdi-format-indent-increase</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-italic"></q-icon>
      <span class="q-ml-md">mdi-format-italic</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-line-spacing"></q-icon>
      <span class="q-ml-md">mdi-format-line-spacing</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-line-style"></q-icon>
      <span class="q-ml-md">mdi-format-line-style</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-line-weight"></q-icon>
      <span class="q-ml-md">mdi-format-line-weight</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-list-bulleted"></q-icon>
      <span class="q-ml-md">mdi-format-list-bulleted</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-list-bulleted-type"></q-icon>
      <span class="q-ml-md">mdi-format-list-bulleted-type</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-list-checkbox"></q-icon>
      <span class="q-ml-md">mdi-format-list-checkbox</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-list-checks"></q-icon>
      <span class="q-ml-md">mdi-format-list-checks</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-list-numbers"></q-icon>
      <span class="q-ml-md">mdi-format-list-numbers</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-page-break"></q-icon>
      <span class="q-ml-md">mdi-format-page-break</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-paint"></q-icon>
      <span class="q-ml-md">mdi-format-paint</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-paragraph"></q-icon>
      <span class="q-ml-md">mdi-format-paragraph</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-pilcrow"></q-icon>
      <span class="q-ml-md">mdi-format-pilcrow</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-quote-close"></q-icon>
      <span class="q-ml-md">mdi-format-quote-close</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-quote-open"></q-icon>
      <span class="q-ml-md">mdi-format-quote-open</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-rotate-90"></q-icon>
      <span class="q-ml-md">mdi-format-rotate-90</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-section"></q-icon>
      <span class="q-ml-md">mdi-format-section</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-size"></q-icon>
      <span class="q-ml-md">mdi-format-size</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-strikethrough"></q-icon>
      <span class="q-ml-md">mdi-format-strikethrough</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-strikethrough-variant"></q-icon>
      <span class="q-ml-md">mdi-format-strikethrough-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-subscript"></q-icon>
      <span class="q-ml-md">mdi-format-subscript</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-superscript"></q-icon>
      <span class="q-ml-md">mdi-format-superscript</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-text"></q-icon>
      <span class="q-ml-md">mdi-format-text</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-textdirection-l-to-r"></q-icon>
      <span class="q-ml-md">mdi-format-textdirection-l-to-r</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-textdirection-r-to-l"></q-icon>
      <span class="q-ml-md">mdi-format-textdirection-r-to-l</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-title"></q-icon>
      <span class="q-ml-md">mdi-format-title</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-underline"></q-icon>
      <span class="q-ml-md">mdi-format-underline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-vertical-align-bottom"></q-icon>
      <span class="q-ml-md">mdi-format-vertical-align-bottom</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-vertical-align-center"></q-icon>
      <span class="q-ml-md">mdi-format-vertical-align-center</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-vertical-align-top"></q-icon>
      <span class="q-ml-md">mdi-format-vertical-align-top</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-wrap-inline"></q-icon>
      <span class="q-ml-md">mdi-format-wrap-inline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-wrap-square"></q-icon>
      <span class="q-ml-md">mdi-format-wrap-square</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-wrap-tight"></q-icon>
      <span class="q-ml-md">mdi-format-wrap-tight</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-format-wrap-top-bottom"></q-icon>
      <span class="q-ml-md">mdi-format-wrap-top-bottom</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-forum"></q-icon>
      <span class="q-ml-md">mdi-forum</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-forum-outline"></q-icon>
      <span class="q-ml-md">mdi-forum-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-forward"></q-icon>
      <span class="q-ml-md">mdi-forward</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-fountain"></q-icon>
      <span class="q-ml-md">mdi-fountain</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-foursquare"></q-icon>
      <span class="q-ml-md">mdi-foursquare</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-freebsd"></q-icon>
      <span class="q-ml-md">mdi-freebsd</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-fridge"></q-icon>
      <span class="q-ml-md">mdi-fridge</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-fridge-filled"></q-icon>
      <span class="q-ml-md">mdi-fridge-filled</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-fridge-filled-bottom"></q-icon>
      <span class="q-ml-md">mdi-fridge-filled-bottom</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-fridge-filled-top"></q-icon>
      <span class="q-ml-md">mdi-fridge-filled-top</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-fuel"></q-icon>
      <span class="q-ml-md">mdi-fuel</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-fullscreen"></q-icon>
      <span class="q-ml-md">mdi-fullscreen</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-fullscreen-exit"></q-icon>
      <span class="q-ml-md">mdi-fullscreen-exit</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-function"></q-icon>
      <span class="q-ml-md">mdi-function</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-function-variant"></q-icon>
      <span class="q-ml-md">mdi-function-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gamepad"></q-icon>
      <span class="q-ml-md">mdi-gamepad</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gamepad-variant"></q-icon>
      <span class="q-ml-md">mdi-gamepad-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-garage"></q-icon>
      <span class="q-ml-md">mdi-garage</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-garage-alert"></q-icon>
      <span class="q-ml-md">mdi-garage-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-garage-open"></q-icon>
      <span class="q-ml-md">mdi-garage-open</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gas-cylinder"></q-icon>
      <span class="q-ml-md">mdi-gas-cylinder</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gas-station"></q-icon>
      <span class="q-ml-md">mdi-gas-station</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gate"></q-icon>
      <span class="q-ml-md">mdi-gate</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gate-and"></q-icon>
      <span class="q-ml-md">mdi-gate-and</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gate-nand"></q-icon>
      <span class="q-ml-md">mdi-gate-nand</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gate-nor"></q-icon>
      <span class="q-ml-md">mdi-gate-nor</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gate-not"></q-icon>
      <span class="q-ml-md">mdi-gate-not</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gate-or"></q-icon>
      <span class="q-ml-md">mdi-gate-or</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gate-xnor"></q-icon>
      <span class="q-ml-md">mdi-gate-xnor</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gate-xor"></q-icon>
      <span class="q-ml-md">mdi-gate-xor</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gauge"></q-icon>
      <span class="q-ml-md">mdi-gauge</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gauge-empty"></q-icon>
      <span class="q-ml-md">mdi-gauge-empty</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gauge-full"></q-icon>
      <span class="q-ml-md">mdi-gauge-full</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gauge-low"></q-icon>
      <span class="q-ml-md">mdi-gauge-low</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gavel"></q-icon>
      <span class="q-ml-md">mdi-gavel</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gender-female"></q-icon>
      <span class="q-ml-md">mdi-gender-female</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gender-male"></q-icon>
      <span class="q-ml-md">mdi-gender-male</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gender-male-female"></q-icon>
      <span class="q-ml-md">mdi-gender-male-female</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gender-transgender"></q-icon>
      <span class="q-ml-md">mdi-gender-transgender</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gentoo"></q-icon>
      <span class="q-ml-md">mdi-gentoo</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gesture"></q-icon>
      <span class="q-ml-md">mdi-gesture</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gesture-double-tap"></q-icon>
      <span class="q-ml-md">mdi-gesture-double-tap</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gesture-swipe-down"></q-icon>
      <span class="q-ml-md">mdi-gesture-swipe-down</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gesture-swipe-left"></q-icon>
      <span class="q-ml-md">mdi-gesture-swipe-left</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gesture-swipe-right"></q-icon>
      <span class="q-ml-md">mdi-gesture-swipe-right</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gesture-swipe-up"></q-icon>
      <span class="q-ml-md">mdi-gesture-swipe-up</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gesture-tap"></q-icon>
      <span class="q-ml-md">mdi-gesture-tap</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gesture-two-double-tap"></q-icon>
      <span class="q-ml-md">mdi-gesture-two-double-tap</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gesture-two-tap"></q-icon>
      <span class="q-ml-md">mdi-gesture-two-tap</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ghost"></q-icon>
      <span class="q-ml-md">mdi-ghost</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ghost-off"></q-icon>
      <span class="q-ml-md">mdi-ghost-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gift"></q-icon>
      <span class="q-ml-md">mdi-gift</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-git"></q-icon>
      <span class="q-ml-md">mdi-git</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-github-box"></q-icon>
      <span class="q-ml-md">mdi-github-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-github-circle"></q-icon>
      <span class="q-ml-md">mdi-github-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-github-face"></q-icon>
      <span class="q-ml-md">mdi-github-face</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-glass-cocktail"></q-icon>
      <span class="q-ml-md">mdi-glass-cocktail</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-glass-flute"></q-icon>
      <span class="q-ml-md">mdi-glass-flute</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-glass-mug"></q-icon>
      <span class="q-ml-md">mdi-glass-mug</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-glass-stange"></q-icon>
      <span class="q-ml-md">mdi-glass-stange</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-glass-tulip"></q-icon>
      <span class="q-ml-md">mdi-glass-tulip</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-glass-wine"></q-icon>
      <span class="q-ml-md">mdi-glass-wine</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-glassdoor"></q-icon>
      <span class="q-ml-md">mdi-glassdoor</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-glasses"></q-icon>
      <span class="q-ml-md">mdi-glasses</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-globe-model"></q-icon>
      <span class="q-ml-md">mdi-globe-model</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gmail"></q-icon>
      <span class="q-ml-md">mdi-gmail</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gnome"></q-icon>
      <span class="q-ml-md">mdi-gnome</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-golf"></q-icon>
      <span class="q-ml-md">mdi-golf</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gondola"></q-icon>
      <span class="q-ml-md">mdi-gondola</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google"></q-icon>
      <span class="q-ml-md">mdi-google</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-allo"></q-icon>
      <span class="q-ml-md">mdi-google-allo</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-analytics"></q-icon>
      <span class="q-ml-md">mdi-google-analytics</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-assistant"></q-icon>
      <span class="q-ml-md">mdi-google-assistant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-cardboard"></q-icon>
      <span class="q-ml-md">mdi-google-cardboard</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-chrome"></q-icon>
      <span class="q-ml-md">mdi-google-chrome</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-circles"></q-icon>
      <span class="q-ml-md">mdi-google-circles</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-circles-communities"></q-icon>
      <span class="q-ml-md">mdi-google-circles-communities</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-circles-extended"></q-icon>
      <span class="q-ml-md">mdi-google-circles-extended</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-circles-group"></q-icon>
      <span class="q-ml-md">mdi-google-circles-group</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-controller"></q-icon>
      <span class="q-ml-md">mdi-google-controller</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-controller-off"></q-icon>
      <span class="q-ml-md">mdi-google-controller-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-drive"></q-icon>
      <span class="q-ml-md">mdi-google-drive</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-earth"></q-icon>
      <span class="q-ml-md">mdi-google-earth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-fit"></q-icon>
      <span class="q-ml-md">mdi-google-fit</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-glass"></q-icon>
      <span class="q-ml-md">mdi-google-glass</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-hangouts"></q-icon>
      <span class="q-ml-md">mdi-google-hangouts</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-home"></q-icon>
      <span class="q-ml-md">mdi-google-home</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-keep"></q-icon>
      <span class="q-ml-md">mdi-google-keep</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-lens"></q-icon>
      <span class="q-ml-md">mdi-google-lens</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-maps"></q-icon>
      <span class="q-ml-md">mdi-google-maps</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-nearby"></q-icon>
      <span class="q-ml-md">mdi-google-nearby</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-pages"></q-icon>
      <span class="q-ml-md">mdi-google-pages</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-photos"></q-icon>
      <span class="q-ml-md">mdi-google-photos</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-physical-web"></q-icon>
      <span class="q-ml-md">mdi-google-physical-web</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-play"></q-icon>
      <span class="q-ml-md">mdi-google-play</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-plus"></q-icon>
      <span class="q-ml-md">mdi-google-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-plus-box"></q-icon>
      <span class="q-ml-md">mdi-google-plus-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-spreadsheet"></q-icon>
      <span class="q-ml-md">mdi-google-spreadsheet</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-translate"></q-icon>
      <span class="q-ml-md">mdi-google-translate</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-google-wallet"></q-icon>
      <span class="q-ml-md">mdi-google-wallet</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gpu"></q-icon>
      <span class="q-ml-md">mdi-gpu</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-gradient"></q-icon>
      <span class="q-ml-md">mdi-gradient</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-graphql"></q-icon>
      <span class="q-ml-md">mdi-graphql</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-grease-pencil"></q-icon>
      <span class="q-ml-md">mdi-grease-pencil</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-greater-than"></q-icon>
      <span class="q-ml-md">mdi-greater-than</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-greater-than-or-equal"></q-icon>
      <span class="q-ml-md">mdi-greater-than-or-equal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-grid"></q-icon>
      <span class="q-ml-md">mdi-grid</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-grid-large"></q-icon>
      <span class="q-ml-md">mdi-grid-large</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-grid-off"></q-icon>
      <span class="q-ml-md">mdi-grid-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-group"></q-icon>
      <span class="q-ml-md">mdi-group</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-guitar-acoustic"></q-icon>
      <span class="q-ml-md">mdi-guitar-acoustic</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-guitar-electric"></q-icon>
      <span class="q-ml-md">mdi-guitar-electric</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-guitar-pick"></q-icon>
      <span class="q-ml-md">mdi-guitar-pick</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-guitar-pick-outline"></q-icon>
      <span class="q-ml-md">mdi-guitar-pick-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-guy-fawkes-mask"></q-icon>
      <span class="q-ml-md">mdi-guy-fawkes-mask</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hackernews"></q-icon>
      <span class="q-ml-md">mdi-hackernews</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hamburger"></q-icon>
      <span class="q-ml-md">mdi-hamburger</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hammer"></q-icon>
      <span class="q-ml-md">mdi-hammer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hand"></q-icon>
      <span class="q-ml-md">mdi-hand</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hand-okay"></q-icon>
      <span class="q-ml-md">mdi-hand-okay</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hand-peace"></q-icon>
      <span class="q-ml-md">mdi-hand-peace</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hand-peace-variant"></q-icon>
      <span class="q-ml-md">mdi-hand-peace-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hand-pointing-down"></q-icon>
      <span class="q-ml-md">mdi-hand-pointing-down</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hand-pointing-left"></q-icon>
      <span class="q-ml-md">mdi-hand-pointing-left</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hand-pointing-right"></q-icon>
      <span class="q-ml-md">mdi-hand-pointing-right</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hand-pointing-up"></q-icon>
      <span class="q-ml-md">mdi-hand-pointing-up</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hanger"></q-icon>
      <span class="q-ml-md">mdi-hanger</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hard-hat"></q-icon>
      <span class="q-ml-md">mdi-hard-hat</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-harddisk"></q-icon>
      <span class="q-ml-md">mdi-harddisk</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-headphones"></q-icon>
      <span class="q-ml-md">mdi-headphones</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-headphones-bluetooth"></q-icon>
      <span class="q-ml-md">mdi-headphones-bluetooth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-headphones-box"></q-icon>
      <span class="q-ml-md">mdi-headphones-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-headphones-off"></q-icon>
      <span class="q-ml-md">mdi-headphones-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-headphones-settings"></q-icon>
      <span class="q-ml-md">mdi-headphones-settings</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-headset"></q-icon>
      <span class="q-ml-md">mdi-headset</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-headset-dock"></q-icon>
      <span class="q-ml-md">mdi-headset-dock</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-headset-off"></q-icon>
      <span class="q-ml-md">mdi-headset-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-heart"></q-icon>
      <span class="q-ml-md">mdi-heart</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-heart-box"></q-icon>
      <span class="q-ml-md">mdi-heart-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-heart-box-outline"></q-icon>
      <span class="q-ml-md">mdi-heart-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-heart-broken"></q-icon>
      <span class="q-ml-md">mdi-heart-broken</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-heart-circle"></q-icon>
      <span class="q-ml-md">mdi-heart-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-heart-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-heart-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-heart-half"></q-icon>
      <span class="q-ml-md">mdi-heart-half</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-heart-half-full"></q-icon>
      <span class="q-ml-md">mdi-heart-half-full</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-heart-half-outline"></q-icon>
      <span class="q-ml-md">mdi-heart-half-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-heart-multiple"></q-icon>
      <span class="q-ml-md">mdi-heart-multiple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-heart-multiple-outline"></q-icon>
      <span class="q-ml-md">mdi-heart-multiple-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-heart-off"></q-icon>
      <span class="q-ml-md">mdi-heart-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-heart-outline"></q-icon>
      <span class="q-ml-md">mdi-heart-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-heart-pulse"></q-icon>
      <span class="q-ml-md">mdi-heart-pulse</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-help"></q-icon>
      <span class="q-ml-md">mdi-help</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-help-box"></q-icon>
      <span class="q-ml-md">mdi-help-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-help-circle"></q-icon>
      <span class="q-ml-md">mdi-help-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-help-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-help-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-help-network"></q-icon>
      <span class="q-ml-md">mdi-help-network</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hexagon"></q-icon>
      <span class="q-ml-md">mdi-hexagon</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hexagon-multiple"></q-icon>
      <span class="q-ml-md">mdi-hexagon-multiple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hexagon-outline"></q-icon>
      <span class="q-ml-md">mdi-hexagon-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-high-definition"></q-icon>
      <span class="q-ml-md">mdi-high-definition</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-high-definition-box"></q-icon>
      <span class="q-ml-md">mdi-high-definition-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-highway"></q-icon>
      <span class="q-ml-md">mdi-highway</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hinduism"></q-icon>
      <span class="q-ml-md">mdi-hinduism</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-history"></q-icon>
      <span class="q-ml-md">mdi-history</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hockey-puck"></q-icon>
      <span class="q-ml-md">mdi-hockey-puck</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hockey-sticks"></q-icon>
      <span class="q-ml-md">mdi-hockey-sticks</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hololens"></q-icon>
      <span class="q-ml-md">mdi-hololens</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-home"></q-icon>
      <span class="q-ml-md">mdi-home</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-home-account"></q-icon>
      <span class="q-ml-md">mdi-home-account</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-home-alert"></q-icon>
      <span class="q-ml-md">mdi-home-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-home-assistant"></q-icon>
      <span class="q-ml-md">mdi-home-assistant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-home-automation"></q-icon>
      <span class="q-ml-md">mdi-home-automation</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-home-circle"></q-icon>
      <span class="q-ml-md">mdi-home-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-home-currency-usd"></q-icon>
      <span class="q-ml-md">mdi-home-currency-usd</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-home-heart"></q-icon>
      <span class="q-ml-md">mdi-home-heart</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-home-lock"></q-icon>
      <span class="q-ml-md">mdi-home-lock</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-home-lock-open"></q-icon>
      <span class="q-ml-md">mdi-home-lock-open</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-home-map-marker"></q-icon>
      <span class="q-ml-md">mdi-home-map-marker</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-home-minus"></q-icon>
      <span class="q-ml-md">mdi-home-minus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-home-modern"></q-icon>
      <span class="q-ml-md">mdi-home-modern</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-home-outline"></q-icon>
      <span class="q-ml-md">mdi-home-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-home-plus"></q-icon>
      <span class="q-ml-md">mdi-home-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-home-variant"></q-icon>
      <span class="q-ml-md">mdi-home-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hook"></q-icon>
      <span class="q-ml-md">mdi-hook</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hook-off"></q-icon>
      <span class="q-ml-md">mdi-hook-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hops"></q-icon>
      <span class="q-ml-md">mdi-hops</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-horseshoe"></q-icon>
      <span class="q-ml-md">mdi-horseshoe</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hospital"></q-icon>
      <span class="q-ml-md">mdi-hospital</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hospital-building"></q-icon>
      <span class="q-ml-md">mdi-hospital-building</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hospital-marker"></q-icon>
      <span class="q-ml-md">mdi-hospital-marker</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hot-tub"></q-icon>
      <span class="q-ml-md">mdi-hot-tub</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hotel"></q-icon>
      <span class="q-ml-md">mdi-hotel</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-houzz"></q-icon>
      <span class="q-ml-md">mdi-houzz</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-houzz-box"></q-icon>
      <span class="q-ml-md">mdi-houzz-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-hulu"></q-icon>
      <span class="q-ml-md">mdi-hulu</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-human"></q-icon>
      <span class="q-ml-md">mdi-human</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-human-child"></q-icon>
      <span class="q-ml-md">mdi-human-child</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-human-female"></q-icon>
      <span class="q-ml-md">mdi-human-female</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-human-female-boy"></q-icon>
      <span class="q-ml-md">mdi-human-female-boy</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-human-female-female"></q-icon>
      <span class="q-ml-md">mdi-human-female-female</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-human-female-girl"></q-icon>
      <span class="q-ml-md">mdi-human-female-girl</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-human-greeting"></q-icon>
      <span class="q-ml-md">mdi-human-greeting</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-human-handsdown"></q-icon>
      <span class="q-ml-md">mdi-human-handsdown</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-human-handsup"></q-icon>
      <span class="q-ml-md">mdi-human-handsup</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-human-male"></q-icon>
      <span class="q-ml-md">mdi-human-male</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-human-male-boy"></q-icon>
      <span class="q-ml-md">mdi-human-male-boy</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-human-male-female"></q-icon>
      <span class="q-ml-md">mdi-human-male-female</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-human-male-girl"></q-icon>
      <span class="q-ml-md">mdi-human-male-girl</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-human-male-male"></q-icon>
      <span class="q-ml-md">mdi-human-male-male</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-human-pregnant"></q-icon>
      <span class="q-ml-md">mdi-human-pregnant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-humble-bundle"></q-icon>
      <span class="q-ml-md">mdi-humble-bundle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ice-cream"></q-icon>
      <span class="q-ml-md">mdi-ice-cream</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-image"></q-icon>
      <span class="q-ml-md">mdi-image</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-image-album"></q-icon>
      <span class="q-ml-md">mdi-image-album</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-image-area"></q-icon>
      <span class="q-ml-md">mdi-image-area</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-image-area-close"></q-icon>
      <span class="q-ml-md">mdi-image-area-close</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-image-broken"></q-icon>
      <span class="q-ml-md">mdi-image-broken</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-image-broken-variant"></q-icon>
      <span class="q-ml-md">mdi-image-broken-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-image-filter"></q-icon>
      <span class="q-ml-md">mdi-image-filter</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-image-filter-black-white"></q-icon>
      <span class="q-ml-md">mdi-image-filter-black-white</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-image-filter-center-focus"></q-icon>
      <span class="q-ml-md">mdi-image-filter-center-focus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-image-filter-center-focus-weak"></q-icon>
      <span class="q-ml-md">mdi-image-filter-center-focus-weak</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-image-filter-drama"></q-icon>
      <span class="q-ml-md">mdi-image-filter-drama</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-image-filter-frames"></q-icon>
      <span class="q-ml-md">mdi-image-filter-frames</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-image-filter-hdr"></q-icon>
      <span class="q-ml-md">mdi-image-filter-hdr</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-image-filter-none"></q-icon>
      <span class="q-ml-md">mdi-image-filter-none</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-image-filter-tilt-shift"></q-icon>
      <span class="q-ml-md">mdi-image-filter-tilt-shift</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-image-filter-vintage"></q-icon>
      <span class="q-ml-md">mdi-image-filter-vintage</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-image-move"></q-icon>
      <span class="q-ml-md">mdi-image-move</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-image-multiple"></q-icon>
      <span class="q-ml-md">mdi-image-multiple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-image-off"></q-icon>
      <span class="q-ml-md">mdi-image-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-image-outline"></q-icon>
      <span class="q-ml-md">mdi-image-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-image-plus"></q-icon>
      <span class="q-ml-md">mdi-image-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-image-search"></q-icon>
      <span class="q-ml-md">mdi-image-search</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-image-search-outline"></q-icon>
      <span class="q-ml-md">mdi-image-search-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-import"></q-icon>
      <span class="q-ml-md">mdi-import</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-inbox"></q-icon>
      <span class="q-ml-md">mdi-inbox</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-inbox-arrow-down"></q-icon>
      <span class="q-ml-md">mdi-inbox-arrow-down</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-inbox-arrow-up"></q-icon>
      <span class="q-ml-md">mdi-inbox-arrow-up</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-inbox-multiple"></q-icon>
      <span class="q-ml-md">mdi-inbox-multiple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-incognito"></q-icon>
      <span class="q-ml-md">mdi-incognito</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-infinity"></q-icon>
      <span class="q-ml-md">mdi-infinity</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-information"></q-icon>
      <span class="q-ml-md">mdi-information</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-information-outline"></q-icon>
      <span class="q-ml-md">mdi-information-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-information-variant"></q-icon>
      <span class="q-ml-md">mdi-information-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-instagram"></q-icon>
      <span class="q-ml-md">mdi-instagram</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-instapaper"></q-icon>
      <span class="q-ml-md">mdi-instapaper</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-internet-explorer"></q-icon>
      <span class="q-ml-md">mdi-internet-explorer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-invert-colors"></q-icon>
      <span class="q-ml-md">mdi-invert-colors</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ip"></q-icon>
      <span class="q-ml-md">mdi-ip</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ip-network"></q-icon>
      <span class="q-ml-md">mdi-ip-network</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-islam"></q-icon>
      <span class="q-ml-md">mdi-islam</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-itunes"></q-icon>
      <span class="q-ml-md">mdi-itunes</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-jeepney"></q-icon>
      <span class="q-ml-md">mdi-jeepney</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-jira"></q-icon>
      <span class="q-ml-md">mdi-jira</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-jquery"></q-icon>
      <span class="q-ml-md">mdi-jquery</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-jsfiddle"></q-icon>
      <span class="q-ml-md">mdi-jsfiddle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-json"></q-icon>
      <span class="q-ml-md">mdi-json</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-judaism"></q-icon>
      <span class="q-ml-md">mdi-judaism</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-karate"></q-icon>
      <span class="q-ml-md">mdi-karate</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-keg"></q-icon>
      <span class="q-ml-md">mdi-keg</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-kettle"></q-icon>
      <span class="q-ml-md">mdi-kettle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-key"></q-icon>
      <span class="q-ml-md">mdi-key</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-key-change"></q-icon>
      <span class="q-ml-md">mdi-key-change</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-key-minus"></q-icon>
      <span class="q-ml-md">mdi-key-minus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-key-plus"></q-icon>
      <span class="q-ml-md">mdi-key-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-key-remove"></q-icon>
      <span class="q-ml-md">mdi-key-remove</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-key-variant"></q-icon>
      <span class="q-ml-md">mdi-key-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-keyboard"></q-icon>
      <span class="q-ml-md">mdi-keyboard</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-keyboard-backspace"></q-icon>
      <span class="q-ml-md">mdi-keyboard-backspace</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-keyboard-caps"></q-icon>
      <span class="q-ml-md">mdi-keyboard-caps</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-keyboard-close"></q-icon>
      <span class="q-ml-md">mdi-keyboard-close</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-keyboard-off"></q-icon>
      <span class="q-ml-md">mdi-keyboard-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-keyboard-outline"></q-icon>
      <span class="q-ml-md">mdi-keyboard-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-keyboard-return"></q-icon>
      <span class="q-ml-md">mdi-keyboard-return</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-keyboard-settings"></q-icon>
      <span class="q-ml-md">mdi-keyboard-settings</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-keyboard-settings-outline"></q-icon>
      <span class="q-ml-md">mdi-keyboard-settings-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-keyboard-tab"></q-icon>
      <span class="q-ml-md">mdi-keyboard-tab</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-keyboard-variant"></q-icon>
      <span class="q-ml-md">mdi-keyboard-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-kickstarter"></q-icon>
      <span class="q-ml-md">mdi-kickstarter</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-knife"></q-icon>
      <span class="q-ml-md">mdi-knife</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-knife-military"></q-icon>
      <span class="q-ml-md">mdi-knife-military</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-kodi"></q-icon>
      <span class="q-ml-md">mdi-kodi</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-label"></q-icon>
      <span class="q-ml-md">mdi-label</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-label-outline"></q-icon>
      <span class="q-ml-md">mdi-label-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ladybug"></q-icon>
      <span class="q-ml-md">mdi-ladybug</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lambda"></q-icon>
      <span class="q-ml-md">mdi-lambda</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lamp"></q-icon>
      <span class="q-ml-md">mdi-lamp</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lan"></q-icon>
      <span class="q-ml-md">mdi-lan</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lan-connect"></q-icon>
      <span class="q-ml-md">mdi-lan-connect</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lan-disconnect"></q-icon>
      <span class="q-ml-md">mdi-lan-disconnect</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lan-pending"></q-icon>
      <span class="q-ml-md">mdi-lan-pending</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-language-c"></q-icon>
      <span class="q-ml-md">mdi-language-c</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-language-cpp"></q-icon>
      <span class="q-ml-md">mdi-language-cpp</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-language-csharp"></q-icon>
      <span class="q-ml-md">mdi-language-csharp</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-language-css3"></q-icon>
      <span class="q-ml-md">mdi-language-css3</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-language-go"></q-icon>
      <span class="q-ml-md">mdi-language-go</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-language-html5"></q-icon>
      <span class="q-ml-md">mdi-language-html5</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-language-javascript"></q-icon>
      <span class="q-ml-md">mdi-language-javascript</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-language-lua"></q-icon>
      <span class="q-ml-md">mdi-language-lua</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-language-php"></q-icon>
      <span class="q-ml-md">mdi-language-php</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-language-python"></q-icon>
      <span class="q-ml-md">mdi-language-python</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-language-python-text"></q-icon>
      <span class="q-ml-md">mdi-language-python-text</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-language-r"></q-icon>
      <span class="q-ml-md">mdi-language-r</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-language-swift"></q-icon>
      <span class="q-ml-md">mdi-language-swift</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-language-typescript"></q-icon>
      <span class="q-ml-md">mdi-language-typescript</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-laptop"></q-icon>
      <span class="q-ml-md">mdi-laptop</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-laptop-chromebook"></q-icon>
      <span class="q-ml-md">mdi-laptop-chromebook</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-laptop-mac"></q-icon>
      <span class="q-ml-md">mdi-laptop-mac</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-laptop-off"></q-icon>
      <span class="q-ml-md">mdi-laptop-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-laptop-windows"></q-icon>
      <span class="q-ml-md">mdi-laptop-windows</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lastfm"></q-icon>
      <span class="q-ml-md">mdi-lastfm</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lastpass"></q-icon>
      <span class="q-ml-md">mdi-lastpass</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-launch"></q-icon>
      <span class="q-ml-md">mdi-launch</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lava-lamp"></q-icon>
      <span class="q-ml-md">mdi-lava-lamp</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-layers"></q-icon>
      <span class="q-ml-md">mdi-layers</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-layers-off"></q-icon>
      <span class="q-ml-md">mdi-layers-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-layers-off-outline"></q-icon>
      <span class="q-ml-md">mdi-layers-off-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-layers-outline"></q-icon>
      <span class="q-ml-md">mdi-layers-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lead-pencil"></q-icon>
      <span class="q-ml-md">mdi-lead-pencil</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-leaf"></q-icon>
      <span class="q-ml-md">mdi-leaf</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-led-off"></q-icon>
      <span class="q-ml-md">mdi-led-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-led-on"></q-icon>
      <span class="q-ml-md">mdi-led-on</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-led-outline"></q-icon>
      <span class="q-ml-md">mdi-led-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-led-strip"></q-icon>
      <span class="q-ml-md">mdi-led-strip</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-led-variant-off"></q-icon>
      <span class="q-ml-md">mdi-led-variant-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-led-variant-on"></q-icon>
      <span class="q-ml-md">mdi-led-variant-on</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-led-variant-outline"></q-icon>
      <span class="q-ml-md">mdi-led-variant-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-less-than"></q-icon>
      <span class="q-ml-md">mdi-less-than</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-less-than-or-equal"></q-icon>
      <span class="q-ml-md">mdi-less-than-or-equal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-library"></q-icon>
      <span class="q-ml-md">mdi-library</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-library-books"></q-icon>
      <span class="q-ml-md">mdi-library-books</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-library-music"></q-icon>
      <span class="q-ml-md">mdi-library-music</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-library-plus"></q-icon>
      <span class="q-ml-md">mdi-library-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lifebuoy"></q-icon>
      <span class="q-ml-md">mdi-lifebuoy</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-light-switch"></q-icon>
      <span class="q-ml-md">mdi-light-switch</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lightbulb"></q-icon>
      <span class="q-ml-md">mdi-lightbulb</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lightbulb-on"></q-icon>
      <span class="q-ml-md">mdi-lightbulb-on</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lightbulb-on-outline"></q-icon>
      <span class="q-ml-md">mdi-lightbulb-on-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lightbulb-outline"></q-icon>
      <span class="q-ml-md">mdi-lightbulb-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lighthouse"></q-icon>
      <span class="q-ml-md">mdi-lighthouse</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lighthouse-on"></q-icon>
      <span class="q-ml-md">mdi-lighthouse-on</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-link"></q-icon>
      <span class="q-ml-md">mdi-link</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-link-off"></q-icon>
      <span class="q-ml-md">mdi-link-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-link-variant"></q-icon>
      <span class="q-ml-md">mdi-link-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-link-variant-off"></q-icon>
      <span class="q-ml-md">mdi-link-variant-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-linkedin"></q-icon>
      <span class="q-ml-md">mdi-linkedin</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-linkedin-box"></q-icon>
      <span class="q-ml-md">mdi-linkedin-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-linux"></q-icon>
      <span class="q-ml-md">mdi-linux</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-linux-mint"></q-icon>
      <span class="q-ml-md">mdi-linux-mint</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-litecoin"></q-icon>
      <span class="q-ml-md">mdi-litecoin</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-loading"></q-icon>
      <span class="q-ml-md">mdi-loading</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lock"></q-icon>
      <span class="q-ml-md">mdi-lock</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lock-alert"></q-icon>
      <span class="q-ml-md">mdi-lock-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lock-clock"></q-icon>
      <span class="q-ml-md">mdi-lock-clock</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lock-open"></q-icon>
      <span class="q-ml-md">mdi-lock-open</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lock-open-outline"></q-icon>
      <span class="q-ml-md">mdi-lock-open-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lock-outline"></q-icon>
      <span class="q-ml-md">mdi-lock-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lock-pattern"></q-icon>
      <span class="q-ml-md">mdi-lock-pattern</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lock-plus"></q-icon>
      <span class="q-ml-md">mdi-lock-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lock-question"></q-icon>
      <span class="q-ml-md">mdi-lock-question</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lock-reset"></q-icon>
      <span class="q-ml-md">mdi-lock-reset</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lock-smart"></q-icon>
      <span class="q-ml-md">mdi-lock-smart</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-locker"></q-icon>
      <span class="q-ml-md">mdi-locker</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-locker-multiple"></q-icon>
      <span class="q-ml-md">mdi-locker-multiple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-login"></q-icon>
      <span class="q-ml-md">mdi-login</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-login-variant"></q-icon>
      <span class="q-ml-md">mdi-login-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-logout"></q-icon>
      <span class="q-ml-md">mdi-logout</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-logout-variant"></q-icon>
      <span class="q-ml-md">mdi-logout-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-looks"></q-icon>
      <span class="q-ml-md">mdi-looks</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-loop"></q-icon>
      <span class="q-ml-md">mdi-loop</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-loupe"></q-icon>
      <span class="q-ml-md">mdi-loupe</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-lumx"></q-icon>
      <span class="q-ml-md">mdi-lumx</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-magnet"></q-icon>
      <span class="q-ml-md">mdi-magnet</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-magnet-on"></q-icon>
      <span class="q-ml-md">mdi-magnet-on</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-magnify"></q-icon>
      <span class="q-ml-md">mdi-magnify</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-magnify-close"></q-icon>
      <span class="q-ml-md">mdi-magnify-close</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-magnify-minus"></q-icon>
      <span class="q-ml-md">mdi-magnify-minus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-magnify-minus-cursor"></q-icon>
      <span class="q-ml-md">mdi-magnify-minus-cursor</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-magnify-minus-outline"></q-icon>
      <span class="q-ml-md">mdi-magnify-minus-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-magnify-plus"></q-icon>
      <span class="q-ml-md">mdi-magnify-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-magnify-plus-cursor"></q-icon>
      <span class="q-ml-md">mdi-magnify-plus-cursor</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-magnify-plus-outline"></q-icon>
      <span class="q-ml-md">mdi-magnify-plus-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-mail-ru"></q-icon>
      <span class="q-ml-md">mdi-mail-ru</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-mailbox"></q-icon>
      <span class="q-ml-md">mdi-mailbox</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-map"></q-icon>
      <span class="q-ml-md">mdi-map</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-map-legend"></q-icon>
      <span class="q-ml-md">mdi-map-legend</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-map-marker"></q-icon>
      <span class="q-ml-md">mdi-map-marker</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-map-marker-circle"></q-icon>
      <span class="q-ml-md">mdi-map-marker-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-map-marker-distance"></q-icon>
      <span class="q-ml-md">mdi-map-marker-distance</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-map-marker-minus"></q-icon>
      <span class="q-ml-md">mdi-map-marker-minus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-map-marker-multiple"></q-icon>
      <span class="q-ml-md">mdi-map-marker-multiple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-map-marker-off"></q-icon>
      <span class="q-ml-md">mdi-map-marker-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-map-marker-outline"></q-icon>
      <span class="q-ml-md">mdi-map-marker-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-map-marker-plus"></q-icon>
      <span class="q-ml-md">mdi-map-marker-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-map-marker-radius"></q-icon>
      <span class="q-ml-md">mdi-map-marker-radius</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-map-minus"></q-icon>
      <span class="q-ml-md">mdi-map-minus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-map-outline"></q-icon>
      <span class="q-ml-md">mdi-map-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-map-plus"></q-icon>
      <span class="q-ml-md">mdi-map-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-map-search"></q-icon>
      <span class="q-ml-md">mdi-map-search</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-map-search-outline"></q-icon>
      <span class="q-ml-md">mdi-map-search-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-margin"></q-icon>
      <span class="q-ml-md">mdi-margin</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-markdown"></q-icon>
      <span class="q-ml-md">mdi-markdown</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-marker"></q-icon>
      <span class="q-ml-md">mdi-marker</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-marker-check"></q-icon>
      <span class="q-ml-md">mdi-marker-check</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-material-design"></q-icon>
      <span class="q-ml-md">mdi-material-design</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-material-ui"></q-icon>
      <span class="q-ml-md">mdi-material-ui</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-math-compass"></q-icon>
      <span class="q-ml-md">mdi-math-compass</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-matrix"></q-icon>
      <span class="q-ml-md">mdi-matrix</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-maxcdn"></q-icon>
      <span class="q-ml-md">mdi-maxcdn</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-medal"></q-icon>
      <span class="q-ml-md">mdi-medal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-medical-bag"></q-icon>
      <span class="q-ml-md">mdi-medical-bag</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-medium"></q-icon>
      <span class="q-ml-md">mdi-medium</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-memory"></q-icon>
      <span class="q-ml-md">mdi-memory</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-menu"></q-icon>
      <span class="q-ml-md">mdi-menu</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-menu-down"></q-icon>
      <span class="q-ml-md">mdi-menu-down</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-menu-down-outline"></q-icon>
      <span class="q-ml-md">mdi-menu-down-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-menu-left"></q-icon>
      <span class="q-ml-md">mdi-menu-left</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-menu-left-outline"></q-icon>
      <span class="q-ml-md">mdi-menu-left-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-menu-right"></q-icon>
      <span class="q-ml-md">mdi-menu-right</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-menu-right-outline"></q-icon>
      <span class="q-ml-md">mdi-menu-right-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-menu-swap"></q-icon>
      <span class="q-ml-md">mdi-menu-swap</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-menu-swap-outline"></q-icon>
      <span class="q-ml-md">mdi-menu-swap-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-menu-up"></q-icon>
      <span class="q-ml-md">mdi-menu-up</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-menu-up-outline"></q-icon>
      <span class="q-ml-md">mdi-menu-up-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-message"></q-icon>
      <span class="q-ml-md">mdi-message</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-message-alert"></q-icon>
      <span class="q-ml-md">mdi-message-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-message-alert-outline"></q-icon>
      <span class="q-ml-md">mdi-message-alert-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-message-bulleted"></q-icon>
      <span class="q-ml-md">mdi-message-bulleted</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-message-bulleted-off"></q-icon>
      <span class="q-ml-md">mdi-message-bulleted-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-message-draw"></q-icon>
      <span class="q-ml-md">mdi-message-draw</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-message-image"></q-icon>
      <span class="q-ml-md">mdi-message-image</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-message-outline"></q-icon>
      <span class="q-ml-md">mdi-message-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-message-plus"></q-icon>
      <span class="q-ml-md">mdi-message-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-message-processing"></q-icon>
      <span class="q-ml-md">mdi-message-processing</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-message-reply"></q-icon>
      <span class="q-ml-md">mdi-message-reply</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-message-reply-text"></q-icon>
      <span class="q-ml-md">mdi-message-reply-text</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-message-settings"></q-icon>
      <span class="q-ml-md">mdi-message-settings</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-message-settings-variant"></q-icon>
      <span class="q-ml-md">mdi-message-settings-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-message-text"></q-icon>
      <span class="q-ml-md">mdi-message-text</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-message-text-outline"></q-icon>
      <span class="q-ml-md">mdi-message-text-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-message-video"></q-icon>
      <span class="q-ml-md">mdi-message-video</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-meteor"></q-icon>
      <span class="q-ml-md">mdi-meteor</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-metronome"></q-icon>
      <span class="q-ml-md">mdi-metronome</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-metronome-tick"></q-icon>
      <span class="q-ml-md">mdi-metronome-tick</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-micro-sd"></q-icon>
      <span class="q-ml-md">mdi-micro-sd</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-microphone"></q-icon>
      <span class="q-ml-md">mdi-microphone</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-microphone-minus"></q-icon>
      <span class="q-ml-md">mdi-microphone-minus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-microphone-off"></q-icon>
      <span class="q-ml-md">mdi-microphone-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-microphone-outline"></q-icon>
      <span class="q-ml-md">mdi-microphone-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-microphone-plus"></q-icon>
      <span class="q-ml-md">mdi-microphone-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-microphone-settings"></q-icon>
      <span class="q-ml-md">mdi-microphone-settings</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-microphone-variant"></q-icon>
      <span class="q-ml-md">mdi-microphone-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-microphone-variant-off"></q-icon>
      <span class="q-ml-md">mdi-microphone-variant-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-microscope"></q-icon>
      <span class="q-ml-md">mdi-microscope</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-microsoft"></q-icon>
      <span class="q-ml-md">mdi-microsoft</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-microsoft-dynamics"></q-icon>
      <span class="q-ml-md">mdi-microsoft-dynamics</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-midi"></q-icon>
      <span class="q-ml-md">mdi-midi</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-midi-port"></q-icon>
      <span class="q-ml-md">mdi-midi-port</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-minecraft"></q-icon>
      <span class="q-ml-md">mdi-minecraft</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-mini-sd"></q-icon>
      <span class="q-ml-md">mdi-mini-sd</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-minidisc"></q-icon>
      <span class="q-ml-md">mdi-minidisc</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-minus"></q-icon>
      <span class="q-ml-md">mdi-minus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-minus-box"></q-icon>
      <span class="q-ml-md">mdi-minus-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-minus-box-outline"></q-icon>
      <span class="q-ml-md">mdi-minus-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-minus-circle"></q-icon>
      <span class="q-ml-md">mdi-minus-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-minus-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-minus-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-minus-network"></q-icon>
      <span class="q-ml-md">mdi-minus-network</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-mixcloud"></q-icon>
      <span class="q-ml-md">mdi-mixcloud</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-mixed-reality"></q-icon>
      <span class="q-ml-md">mdi-mixed-reality</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-mixer"></q-icon>
      <span class="q-ml-md">mdi-mixer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-monitor"></q-icon>
      <span class="q-ml-md">mdi-monitor</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-monitor-cellphone"></q-icon>
      <span class="q-ml-md">mdi-monitor-cellphone</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-monitor-cellphone-star"></q-icon>
      <span class="q-ml-md">mdi-monitor-cellphone-star</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-monitor-dashboard"></q-icon>
      <span class="q-ml-md">mdi-monitor-dashboard</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-monitor-multiple"></q-icon>
      <span class="q-ml-md">mdi-monitor-multiple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-more"></q-icon>
      <span class="q-ml-md">mdi-more</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-motorbike"></q-icon>
      <span class="q-ml-md">mdi-motorbike</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-mouse"></q-icon>
      <span class="q-ml-md">mdi-mouse</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-mouse-bluetooth"></q-icon>
      <span class="q-ml-md">mdi-mouse-bluetooth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-mouse-off"></q-icon>
      <span class="q-ml-md">mdi-mouse-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-mouse-variant"></q-icon>
      <span class="q-ml-md">mdi-mouse-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-mouse-variant-off"></q-icon>
      <span class="q-ml-md">mdi-mouse-variant-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-move-resize"></q-icon>
      <span class="q-ml-md">mdi-move-resize</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-move-resize-variant"></q-icon>
      <span class="q-ml-md">mdi-move-resize-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-movie"></q-icon>
      <span class="q-ml-md">mdi-movie</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-movie-roll"></q-icon>
      <span class="q-ml-md">mdi-movie-roll</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-muffin"></q-icon>
      <span class="q-ml-md">mdi-muffin</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-multiplication"></q-icon>
      <span class="q-ml-md">mdi-multiplication</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-multiplication-box"></q-icon>
      <span class="q-ml-md">mdi-multiplication-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-mushroom"></q-icon>
      <span class="q-ml-md">mdi-mushroom</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-mushroom-outline"></q-icon>
      <span class="q-ml-md">mdi-mushroom-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-music"></q-icon>
      <span class="q-ml-md">mdi-music</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-music-box"></q-icon>
      <span class="q-ml-md">mdi-music-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-music-box-outline"></q-icon>
      <span class="q-ml-md">mdi-music-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-music-circle"></q-icon>
      <span class="q-ml-md">mdi-music-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-music-note"></q-icon>
      <span class="q-ml-md">mdi-music-note</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-music-note-bluetooth"></q-icon>
      <span class="q-ml-md">mdi-music-note-bluetooth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-music-note-bluetooth-off"></q-icon>
      <span class="q-ml-md">mdi-music-note-bluetooth-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-music-note-eighth"></q-icon>
      <span class="q-ml-md">mdi-music-note-eighth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-music-note-half"></q-icon>
      <span class="q-ml-md">mdi-music-note-half</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-music-note-off"></q-icon>
      <span class="q-ml-md">mdi-music-note-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-music-note-quarter"></q-icon>
      <span class="q-ml-md">mdi-music-note-quarter</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-music-note-sixteenth"></q-icon>
      <span class="q-ml-md">mdi-music-note-sixteenth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-music-note-whole"></q-icon>
      <span class="q-ml-md">mdi-music-note-whole</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-music-off"></q-icon>
      <span class="q-ml-md">mdi-music-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-nas"></q-icon>
      <span class="q-ml-md">mdi-nas</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-nativescript"></q-icon>
      <span class="q-ml-md">mdi-nativescript</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-nature"></q-icon>
      <span class="q-ml-md">mdi-nature</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-nature-people"></q-icon>
      <span class="q-ml-md">mdi-nature-people</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-navigation"></q-icon>
      <span class="q-ml-md">mdi-navigation</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-near-me"></q-icon>
      <span class="q-ml-md">mdi-near-me</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-needle"></q-icon>
      <span class="q-ml-md">mdi-needle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-netflix"></q-icon>
      <span class="q-ml-md">mdi-netflix</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-network"></q-icon>
      <span class="q-ml-md">mdi-network</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-network-strength-1"></q-icon>
      <span class="q-ml-md">mdi-network-strength-1</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-network-strength-1-alert"></q-icon>
      <span class="q-ml-md">mdi-network-strength-1-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-network-strength-2"></q-icon>
      <span class="q-ml-md">mdi-network-strength-2</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-network-strength-2-alert"></q-icon>
      <span class="q-ml-md">mdi-network-strength-2-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-network-strength-3"></q-icon>
      <span class="q-ml-md">mdi-network-strength-3</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-network-strength-3-alert"></q-icon>
      <span class="q-ml-md">mdi-network-strength-3-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-network-strength-4"></q-icon>
      <span class="q-ml-md">mdi-network-strength-4</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-network-strength-4-alert"></q-icon>
      <span class="q-ml-md">mdi-network-strength-4-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-network-strength-off"></q-icon>
      <span class="q-ml-md">mdi-network-strength-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-network-strength-off-outline"></q-icon>
      <span class="q-ml-md">mdi-network-strength-off-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-network-strength-outline"></q-icon>
      <span class="q-ml-md">mdi-network-strength-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-new-box"></q-icon>
      <span class="q-ml-md">mdi-new-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-newspaper"></q-icon>
      <span class="q-ml-md">mdi-newspaper</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-nfc"></q-icon>
      <span class="q-ml-md">mdi-nfc</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-nfc-tap"></q-icon>
      <span class="q-ml-md">mdi-nfc-tap</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-nfc-variant"></q-icon>
      <span class="q-ml-md">mdi-nfc-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ninja"></q-icon>
      <span class="q-ml-md">mdi-ninja</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-nintendo-switch"></q-icon>
      <span class="q-ml-md">mdi-nintendo-switch</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-nodejs"></q-icon>
      <span class="q-ml-md">mdi-nodejs</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-not-equal"></q-icon>
      <span class="q-ml-md">mdi-not-equal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-not-equal-variant"></q-icon>
      <span class="q-ml-md">mdi-not-equal-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-note"></q-icon>
      <span class="q-ml-md">mdi-note</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-note-multiple"></q-icon>
      <span class="q-ml-md">mdi-note-multiple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-note-multiple-outline"></q-icon>
      <span class="q-ml-md">mdi-note-multiple-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-note-outline"></q-icon>
      <span class="q-ml-md">mdi-note-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-note-plus"></q-icon>
      <span class="q-ml-md">mdi-note-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-note-plus-outline"></q-icon>
      <span class="q-ml-md">mdi-note-plus-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-note-text"></q-icon>
      <span class="q-ml-md">mdi-note-text</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-notebook"></q-icon>
      <span class="q-ml-md">mdi-notebook</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-notification-clear-all"></q-icon>
      <span class="q-ml-md">mdi-notification-clear-all</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-npm"></q-icon>
      <span class="q-ml-md">mdi-npm</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-npm-variant"></q-icon>
      <span class="q-ml-md">mdi-npm-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-npm-variant-outline"></q-icon>
      <span class="q-ml-md">mdi-npm-variant-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-nuke"></q-icon>
      <span class="q-ml-md">mdi-nuke</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-null"></q-icon>
      <span class="q-ml-md">mdi-null</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric"></q-icon>
      <span class="q-ml-md">mdi-numeric</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-0-box"></q-icon>
      <span class="q-ml-md">mdi-numeric-0-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-0-box-multiple-outline"></q-icon>
      <span class="q-ml-md">mdi-numeric-0-box-multiple-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-0-box-outline"></q-icon>
      <span class="q-ml-md">mdi-numeric-0-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-1-box"></q-icon>
      <span class="q-ml-md">mdi-numeric-1-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-1-box-multiple-outline"></q-icon>
      <span class="q-ml-md">mdi-numeric-1-box-multiple-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-1-box-outline"></q-icon>
      <span class="q-ml-md">mdi-numeric-1-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-2-box"></q-icon>
      <span class="q-ml-md">mdi-numeric-2-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-2-box-multiple-outline"></q-icon>
      <span class="q-ml-md">mdi-numeric-2-box-multiple-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-2-box-outline"></q-icon>
      <span class="q-ml-md">mdi-numeric-2-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-3-box"></q-icon>
      <span class="q-ml-md">mdi-numeric-3-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-3-box-multiple-outline"></q-icon>
      <span class="q-ml-md">mdi-numeric-3-box-multiple-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-3-box-outline"></q-icon>
      <span class="q-ml-md">mdi-numeric-3-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-4-box"></q-icon>
      <span class="q-ml-md">mdi-numeric-4-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-4-box-multiple-outline"></q-icon>
      <span class="q-ml-md">mdi-numeric-4-box-multiple-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-4-box-outline"></q-icon>
      <span class="q-ml-md">mdi-numeric-4-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-5-box"></q-icon>
      <span class="q-ml-md">mdi-numeric-5-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-5-box-multiple-outline"></q-icon>
      <span class="q-ml-md">mdi-numeric-5-box-multiple-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-5-box-outline"></q-icon>
      <span class="q-ml-md">mdi-numeric-5-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-6-box"></q-icon>
      <span class="q-ml-md">mdi-numeric-6-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-6-box-multiple-outline"></q-icon>
      <span class="q-ml-md">mdi-numeric-6-box-multiple-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-6-box-outline"></q-icon>
      <span class="q-ml-md">mdi-numeric-6-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-7-box"></q-icon>
      <span class="q-ml-md">mdi-numeric-7-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-7-box-multiple-outline"></q-icon>
      <span class="q-ml-md">mdi-numeric-7-box-multiple-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-7-box-outline"></q-icon>
      <span class="q-ml-md">mdi-numeric-7-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-8-box"></q-icon>
      <span class="q-ml-md">mdi-numeric-8-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-8-box-multiple-outline"></q-icon>
      <span class="q-ml-md">mdi-numeric-8-box-multiple-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-8-box-outline"></q-icon>
      <span class="q-ml-md">mdi-numeric-8-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-9-box"></q-icon>
      <span class="q-ml-md">mdi-numeric-9-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-9-box-multiple-outline"></q-icon>
      <span class="q-ml-md">mdi-numeric-9-box-multiple-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-9-box-outline"></q-icon>
      <span class="q-ml-md">mdi-numeric-9-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-9-plus-box"></q-icon>
      <span class="q-ml-md">mdi-numeric-9-plus-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-9-plus-box-multiple-outline"></q-icon>
      <span class="q-ml-md">mdi-numeric-9-plus-box-multiple-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-numeric-9-plus-box-outline"></q-icon>
      <span class="q-ml-md">mdi-numeric-9-plus-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-nut"></q-icon>
      <span class="q-ml-md">mdi-nut</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-nutrition"></q-icon>
      <span class="q-ml-md">mdi-nutrition</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-oar"></q-icon>
      <span class="q-ml-md">mdi-oar</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-octagon"></q-icon>
      <span class="q-ml-md">mdi-octagon</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-octagon-outline"></q-icon>
      <span class="q-ml-md">mdi-octagon-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-octagram"></q-icon>
      <span class="q-ml-md">mdi-octagram</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-octagram-outline"></q-icon>
      <span class="q-ml-md">mdi-octagram-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-odnoklassniki"></q-icon>
      <span class="q-ml-md">mdi-odnoklassniki</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-office"></q-icon>
      <span class="q-ml-md">mdi-office</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-office-building"></q-icon>
      <span class="q-ml-md">mdi-office-building</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-oil"></q-icon>
      <span class="q-ml-md">mdi-oil</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-oil-temperature"></q-icon>
      <span class="q-ml-md">mdi-oil-temperature</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-omega"></q-icon>
      <span class="q-ml-md">mdi-omega</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-onedrive"></q-icon>
      <span class="q-ml-md">mdi-onedrive</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-onenote"></q-icon>
      <span class="q-ml-md">mdi-onenote</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-onepassword"></q-icon>
      <span class="q-ml-md">mdi-onepassword</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-opacity"></q-icon>
      <span class="q-ml-md">mdi-opacity</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-open-in-app"></q-icon>
      <span class="q-ml-md">mdi-open-in-app</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-open-in-new"></q-icon>
      <span class="q-ml-md">mdi-open-in-new</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-openid"></q-icon>
      <span class="q-ml-md">mdi-openid</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-opera"></q-icon>
      <span class="q-ml-md">mdi-opera</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-orbit"></q-icon>
      <span class="q-ml-md">mdi-orbit</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ornament"></q-icon>
      <span class="q-ml-md">mdi-ornament</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ornament-variant"></q-icon>
      <span class="q-ml-md">mdi-ornament-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-owl"></q-icon>
      <span class="q-ml-md">mdi-owl</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-package"></q-icon>
      <span class="q-ml-md">mdi-package</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-package-down"></q-icon>
      <span class="q-ml-md">mdi-package-down</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-package-up"></q-icon>
      <span class="q-ml-md">mdi-package-up</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-package-variant"></q-icon>
      <span class="q-ml-md">mdi-package-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-package-variant-closed"></q-icon>
      <span class="q-ml-md">mdi-package-variant-closed</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-page-first"></q-icon>
      <span class="q-ml-md">mdi-page-first</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-page-last"></q-icon>
      <span class="q-ml-md">mdi-page-last</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-page-layout-body"></q-icon>
      <span class="q-ml-md">mdi-page-layout-body</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-page-layout-footer"></q-icon>
      <span class="q-ml-md">mdi-page-layout-footer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-page-layout-header"></q-icon>
      <span class="q-ml-md">mdi-page-layout-header</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-page-layout-sidebar-left"></q-icon>
      <span class="q-ml-md">mdi-page-layout-sidebar-left</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-page-layout-sidebar-right"></q-icon>
      <span class="q-ml-md">mdi-page-layout-sidebar-right</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-palette"></q-icon>
      <span class="q-ml-md">mdi-palette</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-palette-advanced"></q-icon>
      <span class="q-ml-md">mdi-palette-advanced</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-palette-swatch"></q-icon>
      <span class="q-ml-md">mdi-palette-swatch</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-panda"></q-icon>
      <span class="q-ml-md">mdi-panda</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pandora"></q-icon>
      <span class="q-ml-md">mdi-pandora</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-panorama"></q-icon>
      <span class="q-ml-md">mdi-panorama</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-panorama-fisheye"></q-icon>
      <span class="q-ml-md">mdi-panorama-fisheye</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-panorama-horizontal"></q-icon>
      <span class="q-ml-md">mdi-panorama-horizontal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-panorama-vertical"></q-icon>
      <span class="q-ml-md">mdi-panorama-vertical</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-panorama-wide-angle"></q-icon>
      <span class="q-ml-md">mdi-panorama-wide-angle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-paper-cut-vertical"></q-icon>
      <span class="q-ml-md">mdi-paper-cut-vertical</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-paperclip"></q-icon>
      <span class="q-ml-md">mdi-paperclip</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-parking"></q-icon>
      <span class="q-ml-md">mdi-parking</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-passport"></q-icon>
      <span class="q-ml-md">mdi-passport</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-patreon"></q-icon>
      <span class="q-ml-md">mdi-patreon</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pause"></q-icon>
      <span class="q-ml-md">mdi-pause</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pause-circle"></q-icon>
      <span class="q-ml-md">mdi-pause-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pause-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-pause-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pause-octagon"></q-icon>
      <span class="q-ml-md">mdi-pause-octagon</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pause-octagon-outline"></q-icon>
      <span class="q-ml-md">mdi-pause-octagon-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-paw"></q-icon>
      <span class="q-ml-md">mdi-paw</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-paw-off"></q-icon>
      <span class="q-ml-md">mdi-paw-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-paypal"></q-icon>
      <span class="q-ml-md">mdi-paypal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-peace"></q-icon>
      <span class="q-ml-md">mdi-peace</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pen"></q-icon>
      <span class="q-ml-md">mdi-pen</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pencil"></q-icon>
      <span class="q-ml-md">mdi-pencil</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pencil-box"></q-icon>
      <span class="q-ml-md">mdi-pencil-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pencil-box-outline"></q-icon>
      <span class="q-ml-md">mdi-pencil-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pencil-circle"></q-icon>
      <span class="q-ml-md">mdi-pencil-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pencil-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-pencil-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pencil-lock"></q-icon>
      <span class="q-ml-md">mdi-pencil-lock</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pencil-off"></q-icon>
      <span class="q-ml-md">mdi-pencil-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pentagon"></q-icon>
      <span class="q-ml-md">mdi-pentagon</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pentagon-outline"></q-icon>
      <span class="q-ml-md">mdi-pentagon-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-percent"></q-icon>
      <span class="q-ml-md">mdi-percent</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-periodic-table"></q-icon>
      <span class="q-ml-md">mdi-periodic-table</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-periodic-table-co2"></q-icon>
      <span class="q-ml-md">mdi-periodic-table-co2</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-periscope"></q-icon>
      <span class="q-ml-md">mdi-periscope</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pharmacy"></q-icon>
      <span class="q-ml-md">mdi-pharmacy</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-phone"></q-icon>
      <span class="q-ml-md">mdi-phone</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-phone-bluetooth"></q-icon>
      <span class="q-ml-md">mdi-phone-bluetooth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-phone-classic"></q-icon>
      <span class="q-ml-md">mdi-phone-classic</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-phone-forward"></q-icon>
      <span class="q-ml-md">mdi-phone-forward</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-phone-hangup"></q-icon>
      <span class="q-ml-md">mdi-phone-hangup</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-phone-in-talk"></q-icon>
      <span class="q-ml-md">mdi-phone-in-talk</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-phone-incoming"></q-icon>
      <span class="q-ml-md">mdi-phone-incoming</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-phone-locked"></q-icon>
      <span class="q-ml-md">mdi-phone-locked</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-phone-log"></q-icon>
      <span class="q-ml-md">mdi-phone-log</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-phone-minus"></q-icon>
      <span class="q-ml-md">mdi-phone-minus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-phone-missed"></q-icon>
      <span class="q-ml-md">mdi-phone-missed</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-phone-outgoing"></q-icon>
      <span class="q-ml-md">mdi-phone-outgoing</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-phone-paused"></q-icon>
      <span class="q-ml-md">mdi-phone-paused</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-phone-plus"></q-icon>
      <span class="q-ml-md">mdi-phone-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-phone-return"></q-icon>
      <span class="q-ml-md">mdi-phone-return</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-phone-rotate-landscape"></q-icon>
      <span class="q-ml-md">mdi-phone-rotate-landscape</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-phone-rotate-portrait"></q-icon>
      <span class="q-ml-md">mdi-phone-rotate-portrait</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-phone-settings"></q-icon>
      <span class="q-ml-md">mdi-phone-settings</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-phone-voip"></q-icon>
      <span class="q-ml-md">mdi-phone-voip</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pi"></q-icon>
      <span class="q-ml-md">mdi-pi</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pi-box"></q-icon>
      <span class="q-ml-md">mdi-pi-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-piano"></q-icon>
      <span class="q-ml-md">mdi-piano</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pickaxe"></q-icon>
      <span class="q-ml-md">mdi-pickaxe</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pier"></q-icon>
      <span class="q-ml-md">mdi-pier</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pier-crane"></q-icon>
      <span class="q-ml-md">mdi-pier-crane</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pig"></q-icon>
      <span class="q-ml-md">mdi-pig</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pill"></q-icon>
      <span class="q-ml-md">mdi-pill</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pillar"></q-icon>
      <span class="q-ml-md">mdi-pillar</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pin"></q-icon>
      <span class="q-ml-md">mdi-pin</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pin-off"></q-icon>
      <span class="q-ml-md">mdi-pin-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pin-off-outline"></q-icon>
      <span class="q-ml-md">mdi-pin-off-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pin-outline"></q-icon>
      <span class="q-ml-md">mdi-pin-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pine-tree"></q-icon>
      <span class="q-ml-md">mdi-pine-tree</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pine-tree-box"></q-icon>
      <span class="q-ml-md">mdi-pine-tree-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pinterest"></q-icon>
      <span class="q-ml-md">mdi-pinterest</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pinterest-box"></q-icon>
      <span class="q-ml-md">mdi-pinterest-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pipe"></q-icon>
      <span class="q-ml-md">mdi-pipe</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pipe-disconnected"></q-icon>
      <span class="q-ml-md">mdi-pipe-disconnected</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pipe-leak"></q-icon>
      <span class="q-ml-md">mdi-pipe-leak</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pirate"></q-icon>
      <span class="q-ml-md">mdi-pirate</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pistol"></q-icon>
      <span class="q-ml-md">mdi-pistol</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-piston"></q-icon>
      <span class="q-ml-md">mdi-piston</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pizza"></q-icon>
      <span class="q-ml-md">mdi-pizza</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-plane-shield"></q-icon>
      <span class="q-ml-md">mdi-plane-shield</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-play"></q-icon>
      <span class="q-ml-md">mdi-play</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-play-box-outline"></q-icon>
      <span class="q-ml-md">mdi-play-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-play-circle"></q-icon>
      <span class="q-ml-md">mdi-play-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-play-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-play-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-play-network"></q-icon>
      <span class="q-ml-md">mdi-play-network</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-play-pause"></q-icon>
      <span class="q-ml-md">mdi-play-pause</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-play-protected-content"></q-icon>
      <span class="q-ml-md">mdi-play-protected-content</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-play-speed"></q-icon>
      <span class="q-ml-md">mdi-play-speed</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-playlist-check"></q-icon>
      <span class="q-ml-md">mdi-playlist-check</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-playlist-edit"></q-icon>
      <span class="q-ml-md">mdi-playlist-edit</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-playlist-minus"></q-icon>
      <span class="q-ml-md">mdi-playlist-minus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-playlist-play"></q-icon>
      <span class="q-ml-md">mdi-playlist-play</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-playlist-plus"></q-icon>
      <span class="q-ml-md">mdi-playlist-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-playlist-remove"></q-icon>
      <span class="q-ml-md">mdi-playlist-remove</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-playstation"></q-icon>
      <span class="q-ml-md">mdi-playstation</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-plex"></q-icon>
      <span class="q-ml-md">mdi-plex</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-plus"></q-icon>
      <span class="q-ml-md">mdi-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-plus-box"></q-icon>
      <span class="q-ml-md">mdi-plus-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-plus-box-outline"></q-icon>
      <span class="q-ml-md">mdi-plus-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-plus-circle"></q-icon>
      <span class="q-ml-md">mdi-plus-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-plus-circle-multiple-outline"></q-icon>
      <span class="q-ml-md">mdi-plus-circle-multiple-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-plus-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-plus-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-plus-minus"></q-icon>
      <span class="q-ml-md">mdi-plus-minus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-plus-minus-box"></q-icon>
      <span class="q-ml-md">mdi-plus-minus-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-plus-network"></q-icon>
      <span class="q-ml-md">mdi-plus-network</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-plus-one"></q-icon>
      <span class="q-ml-md">mdi-plus-one</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-plus-outline"></q-icon>
      <span class="q-ml-md">mdi-plus-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pocket"></q-icon>
      <span class="q-ml-md">mdi-pocket</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-podcast"></q-icon>
      <span class="q-ml-md">mdi-podcast</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pokeball"></q-icon>
      <span class="q-ml-md">mdi-pokeball</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pokemon-go"></q-icon>
      <span class="q-ml-md">mdi-pokemon-go</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-poker-chip"></q-icon>
      <span class="q-ml-md">mdi-poker-chip</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-polaroid"></q-icon>
      <span class="q-ml-md">mdi-polaroid</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-poll"></q-icon>
      <span class="q-ml-md">mdi-poll</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-poll-box"></q-icon>
      <span class="q-ml-md">mdi-poll-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-polymer"></q-icon>
      <span class="q-ml-md">mdi-polymer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pool"></q-icon>
      <span class="q-ml-md">mdi-pool</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-popcorn"></q-icon>
      <span class="q-ml-md">mdi-popcorn</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pot"></q-icon>
      <span class="q-ml-md">mdi-pot</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pot-mix"></q-icon>
      <span class="q-ml-md">mdi-pot-mix</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pound"></q-icon>
      <span class="q-ml-md">mdi-pound</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pound-box"></q-icon>
      <span class="q-ml-md">mdi-pound-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-power"></q-icon>
      <span class="q-ml-md">mdi-power</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-power-cycle"></q-icon>
      <span class="q-ml-md">mdi-power-cycle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-power-off"></q-icon>
      <span class="q-ml-md">mdi-power-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-power-on"></q-icon>
      <span class="q-ml-md">mdi-power-on</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-power-plug"></q-icon>
      <span class="q-ml-md">mdi-power-plug</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-power-plug-off"></q-icon>
      <span class="q-ml-md">mdi-power-plug-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-power-settings"></q-icon>
      <span class="q-ml-md">mdi-power-settings</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-power-sleep"></q-icon>
      <span class="q-ml-md">mdi-power-sleep</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-power-socket"></q-icon>
      <span class="q-ml-md">mdi-power-socket</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-power-socket-au"></q-icon>
      <span class="q-ml-md">mdi-power-socket-au</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-power-socket-eu"></q-icon>
      <span class="q-ml-md">mdi-power-socket-eu</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-power-socket-uk"></q-icon>
      <span class="q-ml-md">mdi-power-socket-uk</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-power-socket-us"></q-icon>
      <span class="q-ml-md">mdi-power-socket-us</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-power-standby"></q-icon>
      <span class="q-ml-md">mdi-power-standby</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-powershell"></q-icon>
      <span class="q-ml-md">mdi-powershell</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-prescription"></q-icon>
      <span class="q-ml-md">mdi-prescription</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-presentation"></q-icon>
      <span class="q-ml-md">mdi-presentation</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-presentation-play"></q-icon>
      <span class="q-ml-md">mdi-presentation-play</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-printer"></q-icon>
      <span class="q-ml-md">mdi-printer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-printer-3d"></q-icon>
      <span class="q-ml-md">mdi-printer-3d</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-printer-alert"></q-icon>
      <span class="q-ml-md">mdi-printer-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-printer-settings"></q-icon>
      <span class="q-ml-md">mdi-printer-settings</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-printer-wireless"></q-icon>
      <span class="q-ml-md">mdi-printer-wireless</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-priority-high"></q-icon>
      <span class="q-ml-md">mdi-priority-high</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-priority-low"></q-icon>
      <span class="q-ml-md">mdi-priority-low</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-professional-hexagon"></q-icon>
      <span class="q-ml-md">mdi-professional-hexagon</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-progress-check"></q-icon>
      <span class="q-ml-md">mdi-progress-check</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-progress-clock"></q-icon>
      <span class="q-ml-md">mdi-progress-clock</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-progress-download"></q-icon>
      <span class="q-ml-md">mdi-progress-download</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-progress-upload"></q-icon>
      <span class="q-ml-md">mdi-progress-upload</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-projector"></q-icon>
      <span class="q-ml-md">mdi-projector</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-projector-screen"></q-icon>
      <span class="q-ml-md">mdi-projector-screen</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-publish"></q-icon>
      <span class="q-ml-md">mdi-publish</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-pulse"></q-icon>
      <span class="q-ml-md">mdi-pulse</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-puzzle"></q-icon>
      <span class="q-ml-md">mdi-puzzle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-puzzle-outline"></q-icon>
      <span class="q-ml-md">mdi-puzzle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-qi"></q-icon>
      <span class="q-ml-md">mdi-qi</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-qqchat"></q-icon>
      <span class="q-ml-md">mdi-qqchat</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-qrcode"></q-icon>
      <span class="q-ml-md">mdi-qrcode</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-qrcode-edit"></q-icon>
      <span class="q-ml-md">mdi-qrcode-edit</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-qrcode-scan"></q-icon>
      <span class="q-ml-md">mdi-qrcode-scan</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-quadcopter"></q-icon>
      <span class="q-ml-md">mdi-quadcopter</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-quality-high"></q-icon>
      <span class="q-ml-md">mdi-quality-high</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-quality-low"></q-icon>
      <span class="q-ml-md">mdi-quality-low</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-quality-medium"></q-icon>
      <span class="q-ml-md">mdi-quality-medium</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-quicktime"></q-icon>
      <span class="q-ml-md">mdi-quicktime</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-rabbit"></q-icon>
      <span class="q-ml-md">mdi-rabbit</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-radar"></q-icon>
      <span class="q-ml-md">mdi-radar</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-radiator"></q-icon>
      <span class="q-ml-md">mdi-radiator</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-radio"></q-icon>
      <span class="q-ml-md">mdi-radio</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-radio-handheld"></q-icon>
      <span class="q-ml-md">mdi-radio-handheld</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-radio-tower"></q-icon>
      <span class="q-ml-md">mdi-radio-tower</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-radioactive"></q-icon>
      <span class="q-ml-md">mdi-radioactive</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-radiobox-blank"></q-icon>
      <span class="q-ml-md">mdi-radiobox-blank</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-radiobox-marked"></q-icon>
      <span class="q-ml-md">mdi-radiobox-marked</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-raspberrypi"></q-icon>
      <span class="q-ml-md">mdi-raspberrypi</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ray-end"></q-icon>
      <span class="q-ml-md">mdi-ray-end</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ray-end-arrow"></q-icon>
      <span class="q-ml-md">mdi-ray-end-arrow</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ray-start"></q-icon>
      <span class="q-ml-md">mdi-ray-start</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ray-start-arrow"></q-icon>
      <span class="q-ml-md">mdi-ray-start-arrow</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ray-start-end"></q-icon>
      <span class="q-ml-md">mdi-ray-start-end</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ray-vertex"></q-icon>
      <span class="q-ml-md">mdi-ray-vertex</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-react"></q-icon>
      <span class="q-ml-md">mdi-react</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-read"></q-icon>
      <span class="q-ml-md">mdi-read</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-receipt"></q-icon>
      <span class="q-ml-md">mdi-receipt</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-record"></q-icon>
      <span class="q-ml-md">mdi-record</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-record-player"></q-icon>
      <span class="q-ml-md">mdi-record-player</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-record-rec"></q-icon>
      <span class="q-ml-md">mdi-record-rec</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-recycle"></q-icon>
      <span class="q-ml-md">mdi-recycle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-reddit"></q-icon>
      <span class="q-ml-md">mdi-reddit</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-redo"></q-icon>
      <span class="q-ml-md">mdi-redo</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-redo-variant"></q-icon>
      <span class="q-ml-md">mdi-redo-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-reflect-horizontal"></q-icon>
      <span class="q-ml-md">mdi-reflect-horizontal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-reflect-vertical"></q-icon>
      <span class="q-ml-md">mdi-reflect-vertical</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-refresh"></q-icon>
      <span class="q-ml-md">mdi-refresh</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-regex"></q-icon>
      <span class="q-ml-md">mdi-regex</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-registered-trademark"></q-icon>
      <span class="q-ml-md">mdi-registered-trademark</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-relative-scale"></q-icon>
      <span class="q-ml-md">mdi-relative-scale</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-reload"></q-icon>
      <span class="q-ml-md">mdi-reload</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-reminder"></q-icon>
      <span class="q-ml-md">mdi-reminder</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-remote"></q-icon>
      <span class="q-ml-md">mdi-remote</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-remote-desktop"></q-icon>
      <span class="q-ml-md">mdi-remote-desktop</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-rename-box"></q-icon>
      <span class="q-ml-md">mdi-rename-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-reorder-horizontal"></q-icon>
      <span class="q-ml-md">mdi-reorder-horizontal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-reorder-vertical"></q-icon>
      <span class="q-ml-md">mdi-reorder-vertical</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-repeat"></q-icon>
      <span class="q-ml-md">mdi-repeat</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-repeat-off"></q-icon>
      <span class="q-ml-md">mdi-repeat-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-repeat-once"></q-icon>
      <span class="q-ml-md">mdi-repeat-once</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-replay"></q-icon>
      <span class="q-ml-md">mdi-replay</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-reply"></q-icon>
      <span class="q-ml-md">mdi-reply</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-reply-all"></q-icon>
      <span class="q-ml-md">mdi-reply-all</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-reproduction"></q-icon>
      <span class="q-ml-md">mdi-reproduction</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-resize"></q-icon>
      <span class="q-ml-md">mdi-resize</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-resize-bottom-right"></q-icon>
      <span class="q-ml-md">mdi-resize-bottom-right</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-responsive"></q-icon>
      <span class="q-ml-md">mdi-responsive</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-restart"></q-icon>
      <span class="q-ml-md">mdi-restart</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-restore"></q-icon>
      <span class="q-ml-md">mdi-restore</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-restore-clock"></q-icon>
      <span class="q-ml-md">mdi-restore-clock</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-rewind"></q-icon>
      <span class="q-ml-md">mdi-rewind</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-rewind-outline"></q-icon>
      <span class="q-ml-md">mdi-rewind-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-rhombus"></q-icon>
      <span class="q-ml-md">mdi-rhombus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-rhombus-medium"></q-icon>
      <span class="q-ml-md">mdi-rhombus-medium</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-rhombus-outline"></q-icon>
      <span class="q-ml-md">mdi-rhombus-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-rhombus-split"></q-icon>
      <span class="q-ml-md">mdi-rhombus-split</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ribbon"></q-icon>
      <span class="q-ml-md">mdi-ribbon</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-rice"></q-icon>
      <span class="q-ml-md">mdi-rice</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ring"></q-icon>
      <span class="q-ml-md">mdi-ring</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-road"></q-icon>
      <span class="q-ml-md">mdi-road</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-road-variant"></q-icon>
      <span class="q-ml-md">mdi-road-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-robot"></q-icon>
      <span class="q-ml-md">mdi-robot</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-robot-vacuum"></q-icon>
      <span class="q-ml-md">mdi-robot-vacuum</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-robot-vacuum-variant"></q-icon>
      <span class="q-ml-md">mdi-robot-vacuum-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-rocket"></q-icon>
      <span class="q-ml-md">mdi-rocket</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-room-service"></q-icon>
      <span class="q-ml-md">mdi-room-service</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-rotate-3d"></q-icon>
      <span class="q-ml-md">mdi-rotate-3d</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-rotate-left"></q-icon>
      <span class="q-ml-md">mdi-rotate-left</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-rotate-left-variant"></q-icon>
      <span class="q-ml-md">mdi-rotate-left-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-rotate-right"></q-icon>
      <span class="q-ml-md">mdi-rotate-right</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-rotate-right-variant"></q-icon>
      <span class="q-ml-md">mdi-rotate-right-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-rounded-corner"></q-icon>
      <span class="q-ml-md">mdi-rounded-corner</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-router-wireless"></q-icon>
      <span class="q-ml-md">mdi-router-wireless</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-router-wireless-settings"></q-icon>
      <span class="q-ml-md">mdi-router-wireless-settings</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-routes"></q-icon>
      <span class="q-ml-md">mdi-routes</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-rowing"></q-icon>
      <span class="q-ml-md">mdi-rowing</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-rss"></q-icon>
      <span class="q-ml-md">mdi-rss</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-rss-box"></q-icon>
      <span class="q-ml-md">mdi-rss-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ruler"></q-icon>
      <span class="q-ml-md">mdi-ruler</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-run"></q-icon>
      <span class="q-ml-md">mdi-run</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-run-fast"></q-icon>
      <span class="q-ml-md">mdi-run-fast</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-safe"></q-icon>
      <span class="q-ml-md">mdi-safe</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sale"></q-icon>
      <span class="q-ml-md">mdi-sale</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-salesforce"></q-icon>
      <span class="q-ml-md">mdi-salesforce</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sass"></q-icon>
      <span class="q-ml-md">mdi-sass</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-satellite"></q-icon>
      <span class="q-ml-md">mdi-satellite</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-satellite-uplink"></q-icon>
      <span class="q-ml-md">mdi-satellite-uplink</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-satellite-variant"></q-icon>
      <span class="q-ml-md">mdi-satellite-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sausage"></q-icon>
      <span class="q-ml-md">mdi-sausage</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-saxophone"></q-icon>
      <span class="q-ml-md">mdi-saxophone</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-scale"></q-icon>
      <span class="q-ml-md">mdi-scale</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-scale-balance"></q-icon>
      <span class="q-ml-md">mdi-scale-balance</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-scale-bathroom"></q-icon>
      <span class="q-ml-md">mdi-scale-bathroom</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-scanner"></q-icon>
      <span class="q-ml-md">mdi-scanner</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-scanner-off"></q-icon>
      <span class="q-ml-md">mdi-scanner-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-school"></q-icon>
      <span class="q-ml-md">mdi-school</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-scissor-cutting"></q-icon>
      <span class="q-ml-md">mdi-scissor-cutting</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-screen-rotation"></q-icon>
      <span class="q-ml-md">mdi-screen-rotation</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-screen-rotation-lock"></q-icon>
      <span class="q-ml-md">mdi-screen-rotation-lock</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-screwdriver"></q-icon>
      <span class="q-ml-md">mdi-screwdriver</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-script"></q-icon>
      <span class="q-ml-md">mdi-script</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sd"></q-icon>
      <span class="q-ml-md">mdi-sd</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-seal"></q-icon>
      <span class="q-ml-md">mdi-seal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-search-web"></q-icon>
      <span class="q-ml-md">mdi-search-web</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-seat-flat"></q-icon>
      <span class="q-ml-md">mdi-seat-flat</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-seat-flat-angled"></q-icon>
      <span class="q-ml-md">mdi-seat-flat-angled</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-seat-individual-suite"></q-icon>
      <span class="q-ml-md">mdi-seat-individual-suite</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-seat-legroom-extra"></q-icon>
      <span class="q-ml-md">mdi-seat-legroom-extra</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-seat-legroom-normal"></q-icon>
      <span class="q-ml-md">mdi-seat-legroom-normal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-seat-legroom-reduced"></q-icon>
      <span class="q-ml-md">mdi-seat-legroom-reduced</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-seat-recline-extra"></q-icon>
      <span class="q-ml-md">mdi-seat-recline-extra</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-seat-recline-normal"></q-icon>
      <span class="q-ml-md">mdi-seat-recline-normal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-security"></q-icon>
      <span class="q-ml-md">mdi-security</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-security-account"></q-icon>
      <span class="q-ml-md">mdi-security-account</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-security-account-outline"></q-icon>
      <span class="q-ml-md">mdi-security-account-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-security-close"></q-icon>
      <span class="q-ml-md">mdi-security-close</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-security-home"></q-icon>
      <span class="q-ml-md">mdi-security-home</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-security-lock"></q-icon>
      <span class="q-ml-md">mdi-security-lock</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-security-network"></q-icon>
      <span class="q-ml-md">mdi-security-network</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-security-off"></q-icon>
      <span class="q-ml-md">mdi-security-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-select"></q-icon>
      <span class="q-ml-md">mdi-select</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-select-all"></q-icon>
      <span class="q-ml-md">mdi-select-all</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-select-drag"></q-icon>
      <span class="q-ml-md">mdi-select-drag</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-select-inverse"></q-icon>
      <span class="q-ml-md">mdi-select-inverse</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-select-off"></q-icon>
      <span class="q-ml-md">mdi-select-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-selection"></q-icon>
      <span class="q-ml-md">mdi-selection</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-selection-drag"></q-icon>
      <span class="q-ml-md">mdi-selection-drag</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-selection-off"></q-icon>
      <span class="q-ml-md">mdi-selection-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-send"></q-icon>
      <span class="q-ml-md">mdi-send</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-send-secure"></q-icon>
      <span class="q-ml-md">mdi-send-secure</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-serial-port"></q-icon>
      <span class="q-ml-md">mdi-serial-port</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-server"></q-icon>
      <span class="q-ml-md">mdi-server</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-server-minus"></q-icon>
      <span class="q-ml-md">mdi-server-minus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-server-network"></q-icon>
      <span class="q-ml-md">mdi-server-network</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-server-network-off"></q-icon>
      <span class="q-ml-md">mdi-server-network-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-server-off"></q-icon>
      <span class="q-ml-md">mdi-server-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-server-plus"></q-icon>
      <span class="q-ml-md">mdi-server-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-server-remove"></q-icon>
      <span class="q-ml-md">mdi-server-remove</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-server-security"></q-icon>
      <span class="q-ml-md">mdi-server-security</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-set-all"></q-icon>
      <span class="q-ml-md">mdi-set-all</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-set-center"></q-icon>
      <span class="q-ml-md">mdi-set-center</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-set-center-right"></q-icon>
      <span class="q-ml-md">mdi-set-center-right</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-set-left"></q-icon>
      <span class="q-ml-md">mdi-set-left</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-set-left-center"></q-icon>
      <span class="q-ml-md">mdi-set-left-center</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-set-left-right"></q-icon>
      <span class="q-ml-md">mdi-set-left-right</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-set-none"></q-icon>
      <span class="q-ml-md">mdi-set-none</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-set-right"></q-icon>
      <span class="q-ml-md">mdi-set-right</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-set-top-box"></q-icon>
      <span class="q-ml-md">mdi-set-top-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-settings"></q-icon>
      <span class="q-ml-md">mdi-settings</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-settings-box"></q-icon>
      <span class="q-ml-md">mdi-settings-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-settings-helper"></q-icon>
      <span class="q-ml-md">mdi-settings-helper</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-settings-outline"></q-icon>
      <span class="q-ml-md">mdi-settings-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-shape"></q-icon>
      <span class="q-ml-md">mdi-shape</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-shape-circle-plus"></q-icon>
      <span class="q-ml-md">mdi-shape-circle-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-shape-outline"></q-icon>
      <span class="q-ml-md">mdi-shape-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-shape-plus"></q-icon>
      <span class="q-ml-md">mdi-shape-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-shape-polygon-plus"></q-icon>
      <span class="q-ml-md">mdi-shape-polygon-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-shape-rectangle-plus"></q-icon>
      <span class="q-ml-md">mdi-shape-rectangle-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-shape-square-plus"></q-icon>
      <span class="q-ml-md">mdi-shape-square-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-share"></q-icon>
      <span class="q-ml-md">mdi-share</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-share-outline"></q-icon>
      <span class="q-ml-md">mdi-share-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-share-variant"></q-icon>
      <span class="q-ml-md">mdi-share-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-shield"></q-icon>
      <span class="q-ml-md">mdi-shield</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-shield-half-full"></q-icon>
      <span class="q-ml-md">mdi-shield-half-full</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-shield-outline"></q-icon>
      <span class="q-ml-md">mdi-shield-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ship-wheel"></q-icon>
      <span class="q-ml-md">mdi-ship-wheel</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-shopping"></q-icon>
      <span class="q-ml-md">mdi-shopping</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-shopping-music"></q-icon>
      <span class="q-ml-md">mdi-shopping-music</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-shovel"></q-icon>
      <span class="q-ml-md">mdi-shovel</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-shovel-off"></q-icon>
      <span class="q-ml-md">mdi-shovel-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-shower"></q-icon>
      <span class="q-ml-md">mdi-shower</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-shower-head"></q-icon>
      <span class="q-ml-md">mdi-shower-head</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-shredder"></q-icon>
      <span class="q-ml-md">mdi-shredder</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-shuffle"></q-icon>
      <span class="q-ml-md">mdi-shuffle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-shuffle-disabled"></q-icon>
      <span class="q-ml-md">mdi-shuffle-disabled</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-shuffle-variant"></q-icon>
      <span class="q-ml-md">mdi-shuffle-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sigma"></q-icon>
      <span class="q-ml-md">mdi-sigma</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sigma-lower"></q-icon>
      <span class="q-ml-md">mdi-sigma-lower</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sign-caution"></q-icon>
      <span class="q-ml-md">mdi-sign-caution</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sign-direction"></q-icon>
      <span class="q-ml-md">mdi-sign-direction</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sign-text"></q-icon>
      <span class="q-ml-md">mdi-sign-text</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-signal"></q-icon>
      <span class="q-ml-md">mdi-signal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-signal-2g"></q-icon>
      <span class="q-ml-md">mdi-signal-2g</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-signal-3g"></q-icon>
      <span class="q-ml-md">mdi-signal-3g</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-signal-4g"></q-icon>
      <span class="q-ml-md">mdi-signal-4g</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-signal-5g"></q-icon>
      <span class="q-ml-md">mdi-signal-5g</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-signal-cellular-1"></q-icon>
      <span class="q-ml-md">mdi-signal-cellular-1</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-signal-cellular-2"></q-icon>
      <span class="q-ml-md">mdi-signal-cellular-2</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-signal-cellular-3"></q-icon>
      <span class="q-ml-md">mdi-signal-cellular-3</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-signal-cellular-outline"></q-icon>
      <span class="q-ml-md">mdi-signal-cellular-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-signal-hspa"></q-icon>
      <span class="q-ml-md">mdi-signal-hspa</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-signal-hspa-plus"></q-icon>
      <span class="q-ml-md">mdi-signal-hspa-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-signal-off"></q-icon>
      <span class="q-ml-md">mdi-signal-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-signal-variant"></q-icon>
      <span class="q-ml-md">mdi-signal-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-silverware"></q-icon>
      <span class="q-ml-md">mdi-silverware</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-silverware-fork"></q-icon>
      <span class="q-ml-md">mdi-silverware-fork</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-silverware-fork-knife"></q-icon>
      <span class="q-ml-md">mdi-silverware-fork-knife</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-silverware-spoon"></q-icon>
      <span class="q-ml-md">mdi-silverware-spoon</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-silverware-variant"></q-icon>
      <span class="q-ml-md">mdi-silverware-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sim"></q-icon>
      <span class="q-ml-md">mdi-sim</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sim-alert"></q-icon>
      <span class="q-ml-md">mdi-sim-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sim-off"></q-icon>
      <span class="q-ml-md">mdi-sim-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sitemap"></q-icon>
      <span class="q-ml-md">mdi-sitemap</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-skip-backward"></q-icon>
      <span class="q-ml-md">mdi-skip-backward</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-skip-forward"></q-icon>
      <span class="q-ml-md">mdi-skip-forward</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-skip-next"></q-icon>
      <span class="q-ml-md">mdi-skip-next</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-skip-next-circle"></q-icon>
      <span class="q-ml-md">mdi-skip-next-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-skip-next-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-skip-next-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-skip-previous"></q-icon>
      <span class="q-ml-md">mdi-skip-previous</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-skip-previous-circle"></q-icon>
      <span class="q-ml-md">mdi-skip-previous-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-skip-previous-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-skip-previous-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-skull"></q-icon>
      <span class="q-ml-md">mdi-skull</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-skype"></q-icon>
      <span class="q-ml-md">mdi-skype</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-skype-business"></q-icon>
      <span class="q-ml-md">mdi-skype-business</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-slack"></q-icon>
      <span class="q-ml-md">mdi-slack</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-slackware"></q-icon>
      <span class="q-ml-md">mdi-slackware</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sleep"></q-icon>
      <span class="q-ml-md">mdi-sleep</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sleep-off"></q-icon>
      <span class="q-ml-md">mdi-sleep-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-smog"></q-icon>
      <span class="q-ml-md">mdi-smog</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-smoke-detector"></q-icon>
      <span class="q-ml-md">mdi-smoke-detector</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-smoking"></q-icon>
      <span class="q-ml-md">mdi-smoking</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-smoking-off"></q-icon>
      <span class="q-ml-md">mdi-smoking-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-snapchat"></q-icon>
      <span class="q-ml-md">mdi-snapchat</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-snowflake"></q-icon>
      <span class="q-ml-md">mdi-snowflake</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-snowman"></q-icon>
      <span class="q-ml-md">mdi-snowman</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-soccer"></q-icon>
      <span class="q-ml-md">mdi-soccer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-soccer-field"></q-icon>
      <span class="q-ml-md">mdi-soccer-field</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sofa"></q-icon>
      <span class="q-ml-md">mdi-sofa</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-solar-power"></q-icon>
      <span class="q-ml-md">mdi-solar-power</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-solid"></q-icon>
      <span class="q-ml-md">mdi-solid</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sort"></q-icon>
      <span class="q-ml-md">mdi-sort</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sort-alphabetical"></q-icon>
      <span class="q-ml-md">mdi-sort-alphabetical</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sort-ascending"></q-icon>
      <span class="q-ml-md">mdi-sort-ascending</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sort-descending"></q-icon>
      <span class="q-ml-md">mdi-sort-descending</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sort-numeric"></q-icon>
      <span class="q-ml-md">mdi-sort-numeric</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sort-variant"></q-icon>
      <span class="q-ml-md">mdi-sort-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-soundcloud"></q-icon>
      <span class="q-ml-md">mdi-soundcloud</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-source-branch"></q-icon>
      <span class="q-ml-md">mdi-source-branch</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-source-commit"></q-icon>
      <span class="q-ml-md">mdi-source-commit</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-source-commit-end"></q-icon>
      <span class="q-ml-md">mdi-source-commit-end</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-source-commit-end-local"></q-icon>
      <span class="q-ml-md">mdi-source-commit-end-local</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-source-commit-local"></q-icon>
      <span class="q-ml-md">mdi-source-commit-local</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-source-commit-next-local"></q-icon>
      <span class="q-ml-md">mdi-source-commit-next-local</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-source-commit-start"></q-icon>
      <span class="q-ml-md">mdi-source-commit-start</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-source-commit-start-next-local"></q-icon>
      <span class="q-ml-md">mdi-source-commit-start-next-local</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-source-fork"></q-icon>
      <span class="q-ml-md">mdi-source-fork</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-source-merge"></q-icon>
      <span class="q-ml-md">mdi-source-merge</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-source-pull"></q-icon>
      <span class="q-ml-md">mdi-source-pull</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-soy-sauce"></q-icon>
      <span class="q-ml-md">mdi-soy-sauce</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-speaker"></q-icon>
      <span class="q-ml-md">mdi-speaker</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-speaker-bluetooth"></q-icon>
      <span class="q-ml-md">mdi-speaker-bluetooth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-speaker-off"></q-icon>
      <span class="q-ml-md">mdi-speaker-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-speaker-wireless"></q-icon>
      <span class="q-ml-md">mdi-speaker-wireless</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-speedometer"></q-icon>
      <span class="q-ml-md">mdi-speedometer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-spellcheck"></q-icon>
      <span class="q-ml-md">mdi-spellcheck</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-spotify"></q-icon>
      <span class="q-ml-md">mdi-spotify</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-spotlight"></q-icon>
      <span class="q-ml-md">mdi-spotlight</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-spotlight-beam"></q-icon>
      <span class="q-ml-md">mdi-spotlight-beam</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-spray"></q-icon>
      <span class="q-ml-md">mdi-spray</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-square"></q-icon>
      <span class="q-ml-md">mdi-square</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-square-edit-outline"></q-icon>
      <span class="q-ml-md">mdi-square-edit-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-square-inc"></q-icon>
      <span class="q-ml-md">mdi-square-inc</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-square-inc-cash"></q-icon>
      <span class="q-ml-md">mdi-square-inc-cash</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-square-medium"></q-icon>
      <span class="q-ml-md">mdi-square-medium</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-square-medium-outline"></q-icon>
      <span class="q-ml-md">mdi-square-medium-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-square-outline"></q-icon>
      <span class="q-ml-md">mdi-square-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-square-root"></q-icon>
      <span class="q-ml-md">mdi-square-root</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-square-root-box"></q-icon>
      <span class="q-ml-md">mdi-square-root-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-square-small"></q-icon>
      <span class="q-ml-md">mdi-square-small</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ssh"></q-icon>
      <span class="q-ml-md">mdi-ssh</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-stack-exchange"></q-icon>
      <span class="q-ml-md">mdi-stack-exchange</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-stack-overflow"></q-icon>
      <span class="q-ml-md">mdi-stack-overflow</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-stadium"></q-icon>
      <span class="q-ml-md">mdi-stadium</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-stairs"></q-icon>
      <span class="q-ml-md">mdi-stairs</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-standard-definition"></q-icon>
      <span class="q-ml-md">mdi-standard-definition</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-star"></q-icon>
      <span class="q-ml-md">mdi-star</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-star-box"></q-icon>
      <span class="q-ml-md">mdi-star-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-star-box-outline"></q-icon>
      <span class="q-ml-md">mdi-star-box-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-star-circle"></q-icon>
      <span class="q-ml-md">mdi-star-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-star-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-star-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-star-face"></q-icon>
      <span class="q-ml-md">mdi-star-face</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-star-half"></q-icon>
      <span class="q-ml-md">mdi-star-half</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-star-off"></q-icon>
      <span class="q-ml-md">mdi-star-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-star-outline"></q-icon>
      <span class="q-ml-md">mdi-star-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-steam"></q-icon>
      <span class="q-ml-md">mdi-steam</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-steam-box"></q-icon>
      <span class="q-ml-md">mdi-steam-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-steering"></q-icon>
      <span class="q-ml-md">mdi-steering</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-steering-off"></q-icon>
      <span class="q-ml-md">mdi-steering-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-step-backward"></q-icon>
      <span class="q-ml-md">mdi-step-backward</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-step-backward-2"></q-icon>
      <span class="q-ml-md">mdi-step-backward-2</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-step-forward"></q-icon>
      <span class="q-ml-md">mdi-step-forward</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-step-forward-2"></q-icon>
      <span class="q-ml-md">mdi-step-forward-2</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-stethoscope"></q-icon>
      <span class="q-ml-md">mdi-stethoscope</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sticker"></q-icon>
      <span class="q-ml-md">mdi-sticker</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sticker-emoji"></q-icon>
      <span class="q-ml-md">mdi-sticker-emoji</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-stocking"></q-icon>
      <span class="q-ml-md">mdi-stocking</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-stop"></q-icon>
      <span class="q-ml-md">mdi-stop</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-stop-circle"></q-icon>
      <span class="q-ml-md">mdi-stop-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-stop-circle-outline"></q-icon>
      <span class="q-ml-md">mdi-stop-circle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-store"></q-icon>
      <span class="q-ml-md">mdi-store</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-store-24-hour"></q-icon>
      <span class="q-ml-md">mdi-store-24-hour</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-stove"></q-icon>
      <span class="q-ml-md">mdi-stove</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-subdirectory-arrow-left"></q-icon>
      <span class="q-ml-md">mdi-subdirectory-arrow-left</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-subdirectory-arrow-right"></q-icon>
      <span class="q-ml-md">mdi-subdirectory-arrow-right</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-subtitles"></q-icon>
      <span class="q-ml-md">mdi-subtitles</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-subtitles-outline"></q-icon>
      <span class="q-ml-md">mdi-subtitles-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-subway"></q-icon>
      <span class="q-ml-md">mdi-subway</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-subway-variant"></q-icon>
      <span class="q-ml-md">mdi-subway-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-summit"></q-icon>
      <span class="q-ml-md">mdi-summit</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sunglasses"></q-icon>
      <span class="q-ml-md">mdi-sunglasses</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-surround-sound"></q-icon>
      <span class="q-ml-md">mdi-surround-sound</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-surround-sound-2-0"></q-icon>
      <span class="q-ml-md">mdi-surround-sound-2-0</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-surround-sound-3-1"></q-icon>
      <span class="q-ml-md">mdi-surround-sound-3-1</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-surround-sound-5-1"></q-icon>
      <span class="q-ml-md">mdi-surround-sound-5-1</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-surround-sound-7-1"></q-icon>
      <span class="q-ml-md">mdi-surround-sound-7-1</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-svg"></q-icon>
      <span class="q-ml-md">mdi-svg</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-swap-horizontal"></q-icon>
      <span class="q-ml-md">mdi-swap-horizontal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-swap-horizontal-variant"></q-icon>
      <span class="q-ml-md">mdi-swap-horizontal-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-swap-vertical"></q-icon>
      <span class="q-ml-md">mdi-swap-vertical</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-swap-vertical-variant"></q-icon>
      <span class="q-ml-md">mdi-swap-vertical-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-swim"></q-icon>
      <span class="q-ml-md">mdi-swim</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-switch"></q-icon>
      <span class="q-ml-md">mdi-switch</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sword"></q-icon>
      <span class="q-ml-md">mdi-sword</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sword-cross"></q-icon>
      <span class="q-ml-md">mdi-sword-cross</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sync"></q-icon>
      <span class="q-ml-md">mdi-sync</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sync-alert"></q-icon>
      <span class="q-ml-md">mdi-sync-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-sync-off"></q-icon>
      <span class="q-ml-md">mdi-sync-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tab"></q-icon>
      <span class="q-ml-md">mdi-tab</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tab-plus"></q-icon>
      <span class="q-ml-md">mdi-tab-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tab-unselected"></q-icon>
      <span class="q-ml-md">mdi-tab-unselected</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-table"></q-icon>
      <span class="q-ml-md">mdi-table</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-table-border"></q-icon>
      <span class="q-ml-md">mdi-table-border</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-table-column"></q-icon>
      <span class="q-ml-md">mdi-table-column</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-table-column-plus-after"></q-icon>
      <span class="q-ml-md">mdi-table-column-plus-after</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-table-column-plus-before"></q-icon>
      <span class="q-ml-md">mdi-table-column-plus-before</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-table-column-remove"></q-icon>
      <span class="q-ml-md">mdi-table-column-remove</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-table-column-width"></q-icon>
      <span class="q-ml-md">mdi-table-column-width</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-table-edit"></q-icon>
      <span class="q-ml-md">mdi-table-edit</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-table-large"></q-icon>
      <span class="q-ml-md">mdi-table-large</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-table-merge-cells"></q-icon>
      <span class="q-ml-md">mdi-table-merge-cells</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-table-of-contents"></q-icon>
      <span class="q-ml-md">mdi-table-of-contents</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-table-plus"></q-icon>
      <span class="q-ml-md">mdi-table-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-table-remove"></q-icon>
      <span class="q-ml-md">mdi-table-remove</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-table-row"></q-icon>
      <span class="q-ml-md">mdi-table-row</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-table-row-height"></q-icon>
      <span class="q-ml-md">mdi-table-row-height</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-table-row-plus-after"></q-icon>
      <span class="q-ml-md">mdi-table-row-plus-after</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-table-row-plus-before"></q-icon>
      <span class="q-ml-md">mdi-table-row-plus-before</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-table-row-remove"></q-icon>
      <span class="q-ml-md">mdi-table-row-remove</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-table-search"></q-icon>
      <span class="q-ml-md">mdi-table-search</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-table-settings"></q-icon>
      <span class="q-ml-md">mdi-table-settings</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tablet"></q-icon>
      <span class="q-ml-md">mdi-tablet</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tablet-android"></q-icon>
      <span class="q-ml-md">mdi-tablet-android</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tablet-cellphone"></q-icon>
      <span class="q-ml-md">mdi-tablet-cellphone</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tablet-ipad"></q-icon>
      <span class="q-ml-md">mdi-tablet-ipad</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-taco"></q-icon>
      <span class="q-ml-md">mdi-taco</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tag"></q-icon>
      <span class="q-ml-md">mdi-tag</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tag-faces"></q-icon>
      <span class="q-ml-md">mdi-tag-faces</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tag-heart"></q-icon>
      <span class="q-ml-md">mdi-tag-heart</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tag-minus"></q-icon>
      <span class="q-ml-md">mdi-tag-minus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tag-multiple"></q-icon>
      <span class="q-ml-md">mdi-tag-multiple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tag-outline"></q-icon>
      <span class="q-ml-md">mdi-tag-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tag-plus"></q-icon>
      <span class="q-ml-md">mdi-tag-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tag-remove"></q-icon>
      <span class="q-ml-md">mdi-tag-remove</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tag-text-outline"></q-icon>
      <span class="q-ml-md">mdi-tag-text-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-target"></q-icon>
      <span class="q-ml-md">mdi-target</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-target-variant"></q-icon>
      <span class="q-ml-md">mdi-target-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-taxi"></q-icon>
      <span class="q-ml-md">mdi-taxi</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-teach"></q-icon>
      <span class="q-ml-md">mdi-teach</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-teamviewer"></q-icon>
      <span class="q-ml-md">mdi-teamviewer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-telegram"></q-icon>
      <span class="q-ml-md">mdi-telegram</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-television"></q-icon>
      <span class="q-ml-md">mdi-television</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-television-box"></q-icon>
      <span class="q-ml-md">mdi-television-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-television-classic"></q-icon>
      <span class="q-ml-md">mdi-television-classic</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-television-classic-off"></q-icon>
      <span class="q-ml-md">mdi-television-classic-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-television-guide"></q-icon>
      <span class="q-ml-md">mdi-television-guide</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-television-off"></q-icon>
      <span class="q-ml-md">mdi-television-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-temperature-celsius"></q-icon>
      <span class="q-ml-md">mdi-temperature-celsius</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-temperature-fahrenheit"></q-icon>
      <span class="q-ml-md">mdi-temperature-fahrenheit</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-temperature-kelvin"></q-icon>
      <span class="q-ml-md">mdi-temperature-kelvin</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tennis"></q-icon>
      <span class="q-ml-md">mdi-tennis</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tent"></q-icon>
      <span class="q-ml-md">mdi-tent</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-terrain"></q-icon>
      <span class="q-ml-md">mdi-terrain</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-test-tube"></q-icon>
      <span class="q-ml-md">mdi-test-tube</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-test-tube-empty"></q-icon>
      <span class="q-ml-md">mdi-test-tube-empty</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-test-tube-off"></q-icon>
      <span class="q-ml-md">mdi-test-tube-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-text"></q-icon>
      <span class="q-ml-md">mdi-text</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-text-shadow"></q-icon>
      <span class="q-ml-md">mdi-text-shadow</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-text-short"></q-icon>
      <span class="q-ml-md">mdi-text-short</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-text-subject"></q-icon>
      <span class="q-ml-md">mdi-text-subject</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-text-to-speech"></q-icon>
      <span class="q-ml-md">mdi-text-to-speech</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-text-to-speech-off"></q-icon>
      <span class="q-ml-md">mdi-text-to-speech-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-textbox"></q-icon>
      <span class="q-ml-md">mdi-textbox</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-textbox-password"></q-icon>
      <span class="q-ml-md">mdi-textbox-password</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-texture"></q-icon>
      <span class="q-ml-md">mdi-texture</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-theater"></q-icon>
      <span class="q-ml-md">mdi-theater</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-theme-light-dark"></q-icon>
      <span class="q-ml-md">mdi-theme-light-dark</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-thermometer"></q-icon>
      <span class="q-ml-md">mdi-thermometer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-thermometer-lines"></q-icon>
      <span class="q-ml-md">mdi-thermometer-lines</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-thermostat"></q-icon>
      <span class="q-ml-md">mdi-thermostat</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-thermostat-box"></q-icon>
      <span class="q-ml-md">mdi-thermostat-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-thought-bubble"></q-icon>
      <span class="q-ml-md">mdi-thought-bubble</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-thought-bubble-outline"></q-icon>
      <span class="q-ml-md">mdi-thought-bubble-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-thumb-down"></q-icon>
      <span class="q-ml-md">mdi-thumb-down</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-thumb-down-outline"></q-icon>
      <span class="q-ml-md">mdi-thumb-down-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-thumb-up"></q-icon>
      <span class="q-ml-md">mdi-thumb-up</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-thumb-up-outline"></q-icon>
      <span class="q-ml-md">mdi-thumb-up-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-thumbs-up-down"></q-icon>
      <span class="q-ml-md">mdi-thumbs-up-down</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ticket"></q-icon>
      <span class="q-ml-md">mdi-ticket</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ticket-account"></q-icon>
      <span class="q-ml-md">mdi-ticket-account</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ticket-confirmation"></q-icon>
      <span class="q-ml-md">mdi-ticket-confirmation</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ticket-outline"></q-icon>
      <span class="q-ml-md">mdi-ticket-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ticket-percent"></q-icon>
      <span class="q-ml-md">mdi-ticket-percent</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tie"></q-icon>
      <span class="q-ml-md">mdi-tie</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tilde"></q-icon>
      <span class="q-ml-md">mdi-tilde</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-timelapse"></q-icon>
      <span class="q-ml-md">mdi-timelapse</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-timer"></q-icon>
      <span class="q-ml-md">mdi-timer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-timer-10"></q-icon>
      <span class="q-ml-md">mdi-timer-10</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-timer-3"></q-icon>
      <span class="q-ml-md">mdi-timer-3</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-timer-off"></q-icon>
      <span class="q-ml-md">mdi-timer-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-timer-sand"></q-icon>
      <span class="q-ml-md">mdi-timer-sand</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-timer-sand-empty"></q-icon>
      <span class="q-ml-md">mdi-timer-sand-empty</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-timer-sand-full"></q-icon>
      <span class="q-ml-md">mdi-timer-sand-full</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-timetable"></q-icon>
      <span class="q-ml-md">mdi-timetable</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-toggle-switch"></q-icon>
      <span class="q-ml-md">mdi-toggle-switch</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-toggle-switch-off"></q-icon>
      <span class="q-ml-md">mdi-toggle-switch-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-toggle-switch-off-outline"></q-icon>
      <span class="q-ml-md">mdi-toggle-switch-off-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-toggle-switch-outline"></q-icon>
      <span class="q-ml-md">mdi-toggle-switch-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-toilet"></q-icon>
      <span class="q-ml-md">mdi-toilet</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-toolbox"></q-icon>
      <span class="q-ml-md">mdi-toolbox</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-toolbox-outline"></q-icon>
      <span class="q-ml-md">mdi-toolbox-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tooltip"></q-icon>
      <span class="q-ml-md">mdi-tooltip</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tooltip-edit"></q-icon>
      <span class="q-ml-md">mdi-tooltip-edit</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tooltip-image"></q-icon>
      <span class="q-ml-md">mdi-tooltip-image</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tooltip-outline"></q-icon>
      <span class="q-ml-md">mdi-tooltip-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tooltip-outline-plus"></q-icon>
      <span class="q-ml-md">mdi-tooltip-outline-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tooltip-text"></q-icon>
      <span class="q-ml-md">mdi-tooltip-text</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tooth"></q-icon>
      <span class="q-ml-md">mdi-tooth</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tooth-outline"></q-icon>
      <span class="q-ml-md">mdi-tooth-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tor"></q-icon>
      <span class="q-ml-md">mdi-tor</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tournament"></q-icon>
      <span class="q-ml-md">mdi-tournament</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tower-beach"></q-icon>
      <span class="q-ml-md">mdi-tower-beach</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tower-fire"></q-icon>
      <span class="q-ml-md">mdi-tower-fire</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-towing"></q-icon>
      <span class="q-ml-md">mdi-towing</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-track-light"></q-icon>
      <span class="q-ml-md">mdi-track-light</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-trackpad"></q-icon>
      <span class="q-ml-md">mdi-trackpad</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-trackpad-lock"></q-icon>
      <span class="q-ml-md">mdi-trackpad-lock</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tractor"></q-icon>
      <span class="q-ml-md">mdi-tractor</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-trademark"></q-icon>
      <span class="q-ml-md">mdi-trademark</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-traffic-light"></q-icon>
      <span class="q-ml-md">mdi-traffic-light</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-train"></q-icon>
      <span class="q-ml-md">mdi-train</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-train-variant"></q-icon>
      <span class="q-ml-md">mdi-train-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tram"></q-icon>
      <span class="q-ml-md">mdi-tram</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-transcribe"></q-icon>
      <span class="q-ml-md">mdi-transcribe</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-transcribe-close"></q-icon>
      <span class="q-ml-md">mdi-transcribe-close</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-transfer"></q-icon>
      <span class="q-ml-md">mdi-transfer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-transit-transfer"></q-icon>
      <span class="q-ml-md">mdi-transit-transfer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-transition"></q-icon>
      <span class="q-ml-md">mdi-transition</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-transition-masked"></q-icon>
      <span class="q-ml-md">mdi-transition-masked</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-translate"></q-icon>
      <span class="q-ml-md">mdi-translate</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-trash-can"></q-icon>
      <span class="q-ml-md">mdi-trash-can</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-trash-can-outline"></q-icon>
      <span class="q-ml-md">mdi-trash-can-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-treasure-chest"></q-icon>
      <span class="q-ml-md">mdi-treasure-chest</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tree"></q-icon>
      <span class="q-ml-md">mdi-tree</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-trello"></q-icon>
      <span class="q-ml-md">mdi-trello</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-trending-down"></q-icon>
      <span class="q-ml-md">mdi-trending-down</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-trending-neutral"></q-icon>
      <span class="q-ml-md">mdi-trending-neutral</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-trending-up"></q-icon>
      <span class="q-ml-md">mdi-trending-up</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-triangle"></q-icon>
      <span class="q-ml-md">mdi-triangle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-triangle-outline"></q-icon>
      <span class="q-ml-md">mdi-triangle-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-trophy"></q-icon>
      <span class="q-ml-md">mdi-trophy</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-trophy-award"></q-icon>
      <span class="q-ml-md">mdi-trophy-award</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-trophy-outline"></q-icon>
      <span class="q-ml-md">mdi-trophy-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-trophy-variant"></q-icon>
      <span class="q-ml-md">mdi-trophy-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-trophy-variant-outline"></q-icon>
      <span class="q-ml-md">mdi-trophy-variant-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-truck"></q-icon>
      <span class="q-ml-md">mdi-truck</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-truck-delivery"></q-icon>
      <span class="q-ml-md">mdi-truck-delivery</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-truck-fast"></q-icon>
      <span class="q-ml-md">mdi-truck-fast</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-truck-trailer"></q-icon>
      <span class="q-ml-md">mdi-truck-trailer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tshirt-crew"></q-icon>
      <span class="q-ml-md">mdi-tshirt-crew</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tshirt-crew-outline"></q-icon>
      <span class="q-ml-md">mdi-tshirt-crew-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tshirt-v"></q-icon>
      <span class="q-ml-md">mdi-tshirt-v</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tshirt-v-outline"></q-icon>
      <span class="q-ml-md">mdi-tshirt-v-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tumble-dryer"></q-icon>
      <span class="q-ml-md">mdi-tumble-dryer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tumblr"></q-icon>
      <span class="q-ml-md">mdi-tumblr</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tumblr-box"></q-icon>
      <span class="q-ml-md">mdi-tumblr-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tumblr-reblog"></q-icon>
      <span class="q-ml-md">mdi-tumblr-reblog</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tune"></q-icon>
      <span class="q-ml-md">mdi-tune</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-tune-vertical"></q-icon>
      <span class="q-ml-md">mdi-tune-vertical</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-twitch"></q-icon>
      <span class="q-ml-md">mdi-twitch</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-twitter"></q-icon>
      <span class="q-ml-md">mdi-twitter</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-twitter-box"></q-icon>
      <span class="q-ml-md">mdi-twitter-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-twitter-circle"></q-icon>
      <span class="q-ml-md">mdi-twitter-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-twitter-retweet"></q-icon>
      <span class="q-ml-md">mdi-twitter-retweet</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-two-factor-authentication"></q-icon>
      <span class="q-ml-md">mdi-two-factor-authentication</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-uber"></q-icon>
      <span class="q-ml-md">mdi-uber</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ubuntu"></q-icon>
      <span class="q-ml-md">mdi-ubuntu</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ultra-high-definition"></q-icon>
      <span class="q-ml-md">mdi-ultra-high-definition</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-umbraco"></q-icon>
      <span class="q-ml-md">mdi-umbraco</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-umbrella"></q-icon>
      <span class="q-ml-md">mdi-umbrella</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-umbrella-closed"></q-icon>
      <span class="q-ml-md">mdi-umbrella-closed</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-umbrella-outline"></q-icon>
      <span class="q-ml-md">mdi-umbrella-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-undo"></q-icon>
      <span class="q-ml-md">mdi-undo</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-undo-variant"></q-icon>
      <span class="q-ml-md">mdi-undo-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-unfold-less-horizontal"></q-icon>
      <span class="q-ml-md">mdi-unfold-less-horizontal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-unfold-less-vertical"></q-icon>
      <span class="q-ml-md">mdi-unfold-less-vertical</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-unfold-more-horizontal"></q-icon>
      <span class="q-ml-md">mdi-unfold-more-horizontal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-unfold-more-vertical"></q-icon>
      <span class="q-ml-md">mdi-unfold-more-vertical</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-ungroup"></q-icon>
      <span class="q-ml-md">mdi-ungroup</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-unity"></q-icon>
      <span class="q-ml-md">mdi-unity</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-unreal"></q-icon>
      <span class="q-ml-md">mdi-unreal</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-untappd"></q-icon>
      <span class="q-ml-md">mdi-untappd</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-update"></q-icon>
      <span class="q-ml-md">mdi-update</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-upload"></q-icon>
      <span class="q-ml-md">mdi-upload</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-upload-multiple"></q-icon>
      <span class="q-ml-md">mdi-upload-multiple</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-upload-network"></q-icon>
      <span class="q-ml-md">mdi-upload-network</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-usb"></q-icon>
      <span class="q-ml-md">mdi-usb</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-van-passenger"></q-icon>
      <span class="q-ml-md">mdi-van-passenger</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-van-utility"></q-icon>
      <span class="q-ml-md">mdi-van-utility</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vanish"></q-icon>
      <span class="q-ml-md">mdi-vanish</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vector-arrange-above"></q-icon>
      <span class="q-ml-md">mdi-vector-arrange-above</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vector-arrange-below"></q-icon>
      <span class="q-ml-md">mdi-vector-arrange-below</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vector-circle"></q-icon>
      <span class="q-ml-md">mdi-vector-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vector-circle-variant"></q-icon>
      <span class="q-ml-md">mdi-vector-circle-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vector-combine"></q-icon>
      <span class="q-ml-md">mdi-vector-combine</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vector-curve"></q-icon>
      <span class="q-ml-md">mdi-vector-curve</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vector-difference"></q-icon>
      <span class="q-ml-md">mdi-vector-difference</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vector-difference-ab"></q-icon>
      <span class="q-ml-md">mdi-vector-difference-ab</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vector-difference-ba"></q-icon>
      <span class="q-ml-md">mdi-vector-difference-ba</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vector-ellipse"></q-icon>
      <span class="q-ml-md">mdi-vector-ellipse</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vector-intersection"></q-icon>
      <span class="q-ml-md">mdi-vector-intersection</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vector-line"></q-icon>
      <span class="q-ml-md">mdi-vector-line</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vector-point"></q-icon>
      <span class="q-ml-md">mdi-vector-point</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vector-polygon"></q-icon>
      <span class="q-ml-md">mdi-vector-polygon</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vector-polyline"></q-icon>
      <span class="q-ml-md">mdi-vector-polyline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vector-radius"></q-icon>
      <span class="q-ml-md">mdi-vector-radius</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vector-rectangle"></q-icon>
      <span class="q-ml-md">mdi-vector-rectangle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vector-selection"></q-icon>
      <span class="q-ml-md">mdi-vector-selection</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vector-square"></q-icon>
      <span class="q-ml-md">mdi-vector-square</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vector-triangle"></q-icon>
      <span class="q-ml-md">mdi-vector-triangle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vector-union"></q-icon>
      <span class="q-ml-md">mdi-vector-union</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-venmo"></q-icon>
      <span class="q-ml-md">mdi-venmo</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-verified"></q-icon>
      <span class="q-ml-md">mdi-verified</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vhs"></q-icon>
      <span class="q-ml-md">mdi-vhs</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vibrate"></q-icon>
      <span class="q-ml-md">mdi-vibrate</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-video"></q-icon>
      <span class="q-ml-md">mdi-video</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-video-3d"></q-icon>
      <span class="q-ml-md">mdi-video-3d</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-video-4k-box"></q-icon>
      <span class="q-ml-md">mdi-video-4k-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-video-account"></q-icon>
      <span class="q-ml-md">mdi-video-account</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-video-image"></q-icon>
      <span class="q-ml-md">mdi-video-image</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-video-input-antenna"></q-icon>
      <span class="q-ml-md">mdi-video-input-antenna</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-video-input-component"></q-icon>
      <span class="q-ml-md">mdi-video-input-component</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-video-input-hdmi"></q-icon>
      <span class="q-ml-md">mdi-video-input-hdmi</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-video-input-svideo"></q-icon>
      <span class="q-ml-md">mdi-video-input-svideo</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-video-minus"></q-icon>
      <span class="q-ml-md">mdi-video-minus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-video-off"></q-icon>
      <span class="q-ml-md">mdi-video-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-video-plus"></q-icon>
      <span class="q-ml-md">mdi-video-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-video-stabilization"></q-icon>
      <span class="q-ml-md">mdi-video-stabilization</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-video-switch"></q-icon>
      <span class="q-ml-md">mdi-video-switch</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-video-vintage"></q-icon>
      <span class="q-ml-md">mdi-video-vintage</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-view-agenda"></q-icon>
      <span class="q-ml-md">mdi-view-agenda</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-view-array"></q-icon>
      <span class="q-ml-md">mdi-view-array</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-view-carousel"></q-icon>
      <span class="q-ml-md">mdi-view-carousel</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-view-column"></q-icon>
      <span class="q-ml-md">mdi-view-column</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-view-dashboard"></q-icon>
      <span class="q-ml-md">mdi-view-dashboard</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-view-dashboard-outline"></q-icon>
      <span class="q-ml-md">mdi-view-dashboard-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-view-dashboard-variant"></q-icon>
      <span class="q-ml-md">mdi-view-dashboard-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-view-day"></q-icon>
      <span class="q-ml-md">mdi-view-day</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-view-grid"></q-icon>
      <span class="q-ml-md">mdi-view-grid</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-view-headline"></q-icon>
      <span class="q-ml-md">mdi-view-headline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-view-list"></q-icon>
      <span class="q-ml-md">mdi-view-list</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-view-module"></q-icon>
      <span class="q-ml-md">mdi-view-module</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-view-parallel"></q-icon>
      <span class="q-ml-md">mdi-view-parallel</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-view-quilt"></q-icon>
      <span class="q-ml-md">mdi-view-quilt</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-view-sequential"></q-icon>
      <span class="q-ml-md">mdi-view-sequential</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-view-stream"></q-icon>
      <span class="q-ml-md">mdi-view-stream</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-view-week"></q-icon>
      <span class="q-ml-md">mdi-view-week</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vimeo"></q-icon>
      <span class="q-ml-md">mdi-vimeo</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-violin"></q-icon>
      <span class="q-ml-md">mdi-violin</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-virtual-reality"></q-icon>
      <span class="q-ml-md">mdi-virtual-reality</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-visual-studio"></q-icon>
      <span class="q-ml-md">mdi-visual-studio</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-visual-studio-code"></q-icon>
      <span class="q-ml-md">mdi-visual-studio-code</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vk"></q-icon>
      <span class="q-ml-md">mdi-vk</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vk-box"></q-icon>
      <span class="q-ml-md">mdi-vk-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vk-circle"></q-icon>
      <span class="q-ml-md">mdi-vk-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vlc"></q-icon>
      <span class="q-ml-md">mdi-vlc</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-voice"></q-icon>
      <span class="q-ml-md">mdi-voice</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-voicemail"></q-icon>
      <span class="q-ml-md">mdi-voicemail</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-volleyball"></q-icon>
      <span class="q-ml-md">mdi-volleyball</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-volume-high"></q-icon>
      <span class="q-ml-md">mdi-volume-high</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-volume-low"></q-icon>
      <span class="q-ml-md">mdi-volume-low</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-volume-medium"></q-icon>
      <span class="q-ml-md">mdi-volume-medium</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-volume-minus"></q-icon>
      <span class="q-ml-md">mdi-volume-minus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-volume-mute"></q-icon>
      <span class="q-ml-md">mdi-volume-mute</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-volume-off"></q-icon>
      <span class="q-ml-md">mdi-volume-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-volume-plus"></q-icon>
      <span class="q-ml-md">mdi-volume-plus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vote"></q-icon>
      <span class="q-ml-md">mdi-vote</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vote-outline"></q-icon>
      <span class="q-ml-md">mdi-vote-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vpn"></q-icon>
      <span class="q-ml-md">mdi-vpn</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-vuejs"></q-icon>
      <span class="q-ml-md">mdi-vuejs</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-walk"></q-icon>
      <span class="q-ml-md">mdi-walk</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wall"></q-icon>
      <span class="q-ml-md">mdi-wall</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wall-sconce"></q-icon>
      <span class="q-ml-md">mdi-wall-sconce</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wall-sconce-flat"></q-icon>
      <span class="q-ml-md">mdi-wall-sconce-flat</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wall-sconce-variant"></q-icon>
      <span class="q-ml-md">mdi-wall-sconce-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wallet"></q-icon>
      <span class="q-ml-md">mdi-wallet</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wallet-giftcard"></q-icon>
      <span class="q-ml-md">mdi-wallet-giftcard</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wallet-membership"></q-icon>
      <span class="q-ml-md">mdi-wallet-membership</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wallet-travel"></q-icon>
      <span class="q-ml-md">mdi-wallet-travel</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wan"></q-icon>
      <span class="q-ml-md">mdi-wan</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-washing-machine"></q-icon>
      <span class="q-ml-md">mdi-washing-machine</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-watch"></q-icon>
      <span class="q-ml-md">mdi-watch</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-watch-export"></q-icon>
      <span class="q-ml-md">mdi-watch-export</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-watch-export-variant"></q-icon>
      <span class="q-ml-md">mdi-watch-export-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-watch-import"></q-icon>
      <span class="q-ml-md">mdi-watch-import</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-watch-import-variant"></q-icon>
      <span class="q-ml-md">mdi-watch-import-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-watch-variant"></q-icon>
      <span class="q-ml-md">mdi-watch-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-watch-vibrate"></q-icon>
      <span class="q-ml-md">mdi-watch-vibrate</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-water"></q-icon>
      <span class="q-ml-md">mdi-water</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-water-off"></q-icon>
      <span class="q-ml-md">mdi-water-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-water-percent"></q-icon>
      <span class="q-ml-md">mdi-water-percent</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-water-pump"></q-icon>
      <span class="q-ml-md">mdi-water-pump</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-watermark"></q-icon>
      <span class="q-ml-md">mdi-watermark</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-waves"></q-icon>
      <span class="q-ml-md">mdi-waves</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-weather-cloudy"></q-icon>
      <span class="q-ml-md">mdi-weather-cloudy</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-weather-fog"></q-icon>
      <span class="q-ml-md">mdi-weather-fog</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-weather-hail"></q-icon>
      <span class="q-ml-md">mdi-weather-hail</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-weather-hurricane"></q-icon>
      <span class="q-ml-md">mdi-weather-hurricane</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-weather-lightning"></q-icon>
      <span class="q-ml-md">mdi-weather-lightning</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-weather-lightning-rainy"></q-icon>
      <span class="q-ml-md">mdi-weather-lightning-rainy</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-weather-night"></q-icon>
      <span class="q-ml-md">mdi-weather-night</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-weather-partlycloudy"></q-icon>
      <span class="q-ml-md">mdi-weather-partlycloudy</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-weather-pouring"></q-icon>
      <span class="q-ml-md">mdi-weather-pouring</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-weather-rainy"></q-icon>
      <span class="q-ml-md">mdi-weather-rainy</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-weather-snowy"></q-icon>
      <span class="q-ml-md">mdi-weather-snowy</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-weather-snowy-rainy"></q-icon>
      <span class="q-ml-md">mdi-weather-snowy-rainy</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-weather-sunny"></q-icon>
      <span class="q-ml-md">mdi-weather-sunny</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-weather-sunset"></q-icon>
      <span class="q-ml-md">mdi-weather-sunset</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-weather-sunset-down"></q-icon>
      <span class="q-ml-md">mdi-weather-sunset-down</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-weather-sunset-up"></q-icon>
      <span class="q-ml-md">mdi-weather-sunset-up</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-weather-windy"></q-icon>
      <span class="q-ml-md">mdi-weather-windy</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-weather-windy-variant"></q-icon>
      <span class="q-ml-md">mdi-weather-windy-variant</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-web"></q-icon>
      <span class="q-ml-md">mdi-web</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-webcam"></q-icon>
      <span class="q-ml-md">mdi-webcam</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-webhook"></q-icon>
      <span class="q-ml-md">mdi-webhook</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-webpack"></q-icon>
      <span class="q-ml-md">mdi-webpack</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wechat"></q-icon>
      <span class="q-ml-md">mdi-wechat</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-weight"></q-icon>
      <span class="q-ml-md">mdi-weight</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-weight-kilogram"></q-icon>
      <span class="q-ml-md">mdi-weight-kilogram</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-weight-pound"></q-icon>
      <span class="q-ml-md">mdi-weight-pound</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-whatsapp"></q-icon>
      <span class="q-ml-md">mdi-whatsapp</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wheelchair-accessibility"></q-icon>
      <span class="q-ml-md">mdi-wheelchair-accessibility</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-whistle"></q-icon>
      <span class="q-ml-md">mdi-whistle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-white-balance-auto"></q-icon>
      <span class="q-ml-md">mdi-white-balance-auto</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-white-balance-incandescent"></q-icon>
      <span class="q-ml-md">mdi-white-balance-incandescent</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-white-balance-iridescent"></q-icon>
      <span class="q-ml-md">mdi-white-balance-iridescent</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-white-balance-sunny"></q-icon>
      <span class="q-ml-md">mdi-white-balance-sunny</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-widgets"></q-icon>
      <span class="q-ml-md">mdi-widgets</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wifi"></q-icon>
      <span class="q-ml-md">mdi-wifi</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wifi-off"></q-icon>
      <span class="q-ml-md">mdi-wifi-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wifi-strength-1"></q-icon>
      <span class="q-ml-md">mdi-wifi-strength-1</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wifi-strength-1-alert"></q-icon>
      <span class="q-ml-md">mdi-wifi-strength-1-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wifi-strength-1-lock"></q-icon>
      <span class="q-ml-md">mdi-wifi-strength-1-lock</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wifi-strength-2"></q-icon>
      <span class="q-ml-md">mdi-wifi-strength-2</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wifi-strength-2-alert"></q-icon>
      <span class="q-ml-md">mdi-wifi-strength-2-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wifi-strength-2-lock"></q-icon>
      <span class="q-ml-md">mdi-wifi-strength-2-lock</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wifi-strength-3"></q-icon>
      <span class="q-ml-md">mdi-wifi-strength-3</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wifi-strength-3-alert"></q-icon>
      <span class="q-ml-md">mdi-wifi-strength-3-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wifi-strength-3-lock"></q-icon>
      <span class="q-ml-md">mdi-wifi-strength-3-lock</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wifi-strength-4"></q-icon>
      <span class="q-ml-md">mdi-wifi-strength-4</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wifi-strength-4-alert"></q-icon>
      <span class="q-ml-md">mdi-wifi-strength-4-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wifi-strength-4-lock"></q-icon>
      <span class="q-ml-md">mdi-wifi-strength-4-lock</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wifi-strength-alert-outline"></q-icon>
      <span class="q-ml-md">mdi-wifi-strength-alert-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wifi-strength-lock-outline"></q-icon>
      <span class="q-ml-md">mdi-wifi-strength-lock-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wifi-strength-off"></q-icon>
      <span class="q-ml-md">mdi-wifi-strength-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wifi-strength-off-outline"></q-icon>
      <span class="q-ml-md">mdi-wifi-strength-off-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wifi-strength-outline"></q-icon>
      <span class="q-ml-md">mdi-wifi-strength-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wii"></q-icon>
      <span class="q-ml-md">mdi-wii</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wiiu"></q-icon>
      <span class="q-ml-md">mdi-wiiu</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wikipedia"></q-icon>
      <span class="q-ml-md">mdi-wikipedia</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-window-close"></q-icon>
      <span class="q-ml-md">mdi-window-close</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-window-closed"></q-icon>
      <span class="q-ml-md">mdi-window-closed</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-window-maximize"></q-icon>
      <span class="q-ml-md">mdi-window-maximize</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-window-minimize"></q-icon>
      <span class="q-ml-md">mdi-window-minimize</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-window-open"></q-icon>
      <span class="q-ml-md">mdi-window-open</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-window-restore"></q-icon>
      <span class="q-ml-md">mdi-window-restore</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-windows"></q-icon>
      <span class="q-ml-md">mdi-windows</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-windows-classic"></q-icon>
      <span class="q-ml-md">mdi-windows-classic</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wordpress"></q-icon>
      <span class="q-ml-md">mdi-wordpress</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-worker"></q-icon>
      <span class="q-ml-md">mdi-worker</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wrap"></q-icon>
      <span class="q-ml-md">mdi-wrap</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wrench"></q-icon>
      <span class="q-ml-md">mdi-wrench</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-wunderlist"></q-icon>
      <span class="q-ml-md">mdi-wunderlist</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-xamarin"></q-icon>
      <span class="q-ml-md">mdi-xamarin</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-xamarin-outline"></q-icon>
      <span class="q-ml-md">mdi-xamarin-outline</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-xaml"></q-icon>
      <span class="q-ml-md">mdi-xaml</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-xbox"></q-icon>
      <span class="q-ml-md">mdi-xbox</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-xbox-controller"></q-icon>
      <span class="q-ml-md">mdi-xbox-controller</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-xbox-controller-battery-alert"></q-icon>
      <span class="q-ml-md">mdi-xbox-controller-battery-alert</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-xbox-controller-battery-charging"></q-icon>
      <span class="q-ml-md">mdi-xbox-controller-battery-charging</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-xbox-controller-battery-empty"></q-icon>
      <span class="q-ml-md">mdi-xbox-controller-battery-empty</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-xbox-controller-battery-full"></q-icon>
      <span class="q-ml-md">mdi-xbox-controller-battery-full</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-xbox-controller-battery-low"></q-icon>
      <span class="q-ml-md">mdi-xbox-controller-battery-low</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-xbox-controller-battery-medium"></q-icon>
      <span class="q-ml-md">mdi-xbox-controller-battery-medium</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-xbox-controller-battery-unknown"></q-icon>
      <span class="q-ml-md">mdi-xbox-controller-battery-unknown</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-xbox-controller-off"></q-icon>
      <span class="q-ml-md">mdi-xbox-controller-off</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-xda"></q-icon>
      <span class="q-ml-md">mdi-xda</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-xing"></q-icon>
      <span class="q-ml-md">mdi-xing</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-xing-box"></q-icon>
      <span class="q-ml-md">mdi-xing-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-xing-circle"></q-icon>
      <span class="q-ml-md">mdi-xing-circle</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-xml"></q-icon>
      <span class="q-ml-md">mdi-xml</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-xmpp"></q-icon>
      <span class="q-ml-md">mdi-xmpp</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-yammer"></q-icon>
      <span class="q-ml-md">mdi-yammer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-yeast"></q-icon>
      <span class="q-ml-md">mdi-yeast</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-yelp"></q-icon>
      <span class="q-ml-md">mdi-yelp</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-yin-yang"></q-icon>
      <span class="q-ml-md">mdi-yin-yang</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-youtube"></q-icon>
      <span class="q-ml-md">mdi-youtube</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-youtube-creator-studio"></q-icon>
      <span class="q-ml-md">mdi-youtube-creator-studio</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-youtube-gaming"></q-icon>
      <span class="q-ml-md">mdi-youtube-gaming</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-youtube-tv"></q-icon>
      <span class="q-ml-md">mdi-youtube-tv</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-zip-box"></q-icon>
      <span class="q-ml-md">mdi-zip-box</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-zip-disk"></q-icon>
      <span class="q-ml-md">mdi-zip-disk</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-zodiac-aquarius"></q-icon>
      <span class="q-ml-md">mdi-zodiac-aquarius</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-zodiac-aries"></q-icon>
      <span class="q-ml-md">mdi-zodiac-aries</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-zodiac-cancer"></q-icon>
      <span class="q-ml-md">mdi-zodiac-cancer</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-zodiac-capricorn"></q-icon>
      <span class="q-ml-md">mdi-zodiac-capricorn</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-zodiac-gemini"></q-icon>
      <span class="q-ml-md">mdi-zodiac-gemini</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-zodiac-leo"></q-icon>
      <span class="q-ml-md">mdi-zodiac-leo</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-zodiac-libra"></q-icon>
      <span class="q-ml-md">mdi-zodiac-libra</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-zodiac-pisces"></q-icon>
      <span class="q-ml-md">mdi-zodiac-pisces</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-zodiac-sagittarius"></q-icon>
      <span class="q-ml-md">mdi-zodiac-sagittarius</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-zodiac-scorpio"></q-icon>
      <span class="q-ml-md">mdi-zodiac-scorpio</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-zodiac-taurus"></q-icon>
      <span class="q-ml-md">mdi-zodiac-taurus</span>
    </div>

    <div class="q-ma-md">
      <q-icon size="30px" name="mdi-zodiac-virgo"></q-icon>
      <span class="q-ml-md">mdi-zodiac-virgo</span>
    </div>

    <!-- IOS ICON -->
    <h4><a href="https://ionicframework.com/docs/ionicons/" target="_blank">IOS Icons</a></h4>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-add"></q-icon>
      <span class="q-ml-md">ion-ios-add</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-add-circle"></q-icon>
      <span class="q-ml-md">ion-ios-add-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-add-circle-outline"></q-icon>
      <span class="q-ml-md">ion-ios-add-circle-outline</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-airplane"></q-icon>
      <span class="q-ml-md">ion-ios-airplane</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-alarm"></q-icon>
      <span class="q-ml-md">ion-ios-alarm</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-albums"></q-icon>
      <span class="q-ml-md">ion-ios-albums</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-alert"></q-icon>
      <span class="q-ml-md">ion-ios-alert</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-american-football"></q-icon>
      <span class="q-ml-md">ion-ios-american-football</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-analytics"></q-icon>
      <span class="q-ml-md">ion-ios-analytics</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-aperture"></q-icon>
      <span class="q-ml-md">ion-ios-aperture</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-apps"></q-icon>
      <span class="q-ml-md">ion-ios-apps</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-appstore"></q-icon>
      <span class="q-ml-md">ion-ios-appstore</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-archive"></q-icon>
      <span class="q-ml-md">ion-ios-archive</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-arrow-back"></q-icon>
      <span class="q-ml-md">ion-ios-arrow-back</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-arrow-down"></q-icon>
      <span class="q-ml-md">ion-ios-arrow-down</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-arrow-dropdown"></q-icon>
      <span class="q-ml-md">ion-ios-arrow-dropdown</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-arrow-dropdown-circle"></q-icon>
      <span class="q-ml-md">ion-ios-arrow-dropdown-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-arrow-dropleft"></q-icon>
      <span class="q-ml-md">ion-ios-arrow-dropleft</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-arrow-dropleft-circle"></q-icon>
      <span class="q-ml-md">ion-ios-arrow-dropleft-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-arrow-dropright"></q-icon>
      <span class="q-ml-md">ion-ios-arrow-dropright</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-arrow-dropright-circle"></q-icon>
      <span class="q-ml-md">ion-ios-arrow-dropright-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-arrow-dropup"></q-icon>
      <span class="q-ml-md">ion-ios-arrow-dropup</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-arrow-dropup-circle"></q-icon>
      <span class="q-ml-md">ion-ios-arrow-dropup-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-arrow-forward"></q-icon>
      <span class="q-ml-md">ion-ios-arrow-forward</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-arrow-round-back"></q-icon>
      <span class="q-ml-md">ion-ios-arrow-round-back</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-arrow-round-down"></q-icon>
      <span class="q-ml-md">ion-ios-arrow-round-down</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-arrow-round-forward"></q-icon>
      <span class="q-ml-md">ion-ios-arrow-round-forward</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-arrow-round-up"></q-icon>
      <span class="q-ml-md">ion-ios-arrow-round-up</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-arrow-up"></q-icon>
      <span class="q-ml-md">ion-ios-arrow-up</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-at"></q-icon>
      <span class="q-ml-md">ion-ios-at</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-attach"></q-icon>
      <span class="q-ml-md">ion-ios-attach</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-backspace"></q-icon>
      <span class="q-ml-md">ion-ios-backspace</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-barcode"></q-icon>
      <span class="q-ml-md">ion-ios-barcode</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-baseball"></q-icon>
      <span class="q-ml-md">ion-ios-baseball</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-basket"></q-icon>
      <span class="q-ml-md">ion-ios-basket</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-basketball"></q-icon>
      <span class="q-ml-md">ion-ios-basketball</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-battery-charging"></q-icon>
      <span class="q-ml-md">ion-ios-battery-charging</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-battery-dead"></q-icon>
      <span class="q-ml-md">ion-ios-battery-dead</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-battery-full"></q-icon>
      <span class="q-ml-md">ion-ios-battery-full</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-beaker"></q-icon>
      <span class="q-ml-md">ion-ios-beaker</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-bed"></q-icon>
      <span class="q-ml-md">ion-ios-bed</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-beer"></q-icon>
      <span class="q-ml-md">ion-ios-beer</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-bicycle"></q-icon>
      <span class="q-ml-md">ion-ios-bicycle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-bluetooth"></q-icon>
      <span class="q-ml-md">ion-ios-bluetooth</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-boat"></q-icon>
      <span class="q-ml-md">ion-ios-boat</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-body"></q-icon>
      <span class="q-ml-md">ion-ios-body</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-bonfire"></q-icon>
      <span class="q-ml-md">ion-ios-bonfire</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-book"></q-icon>
      <span class="q-ml-md">ion-ios-book</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-bookmark"></q-icon>
      <span class="q-ml-md">ion-ios-bookmark</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-bookmarks"></q-icon>
      <span class="q-ml-md">ion-ios-bookmarks</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-bowtie"></q-icon>
      <span class="q-ml-md">ion-ios-bowtie</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-briefcase"></q-icon>
      <span class="q-ml-md">ion-ios-briefcase</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-browsers"></q-icon>
      <span class="q-ml-md">ion-ios-browsers</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-brush"></q-icon>
      <span class="q-ml-md">ion-ios-brush</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-bug"></q-icon>
      <span class="q-ml-md">ion-ios-bug</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-build"></q-icon>
      <span class="q-ml-md">ion-ios-build</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-bulb"></q-icon>
      <span class="q-ml-md">ion-ios-bulb</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-bus"></q-icon>
      <span class="q-ml-md">ion-ios-bus</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-business"></q-icon>
      <span class="q-ml-md">ion-ios-business</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-cafe"></q-icon>
      <span class="q-ml-md">ion-ios-cafe</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-calculator"></q-icon>
      <span class="q-ml-md">ion-ios-calculator</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-calendar"></q-icon>
      <span class="q-ml-md">ion-ios-calendar</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-call"></q-icon>
      <span class="q-ml-md">ion-ios-call</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-camera"></q-icon>
      <span class="q-ml-md">ion-ios-camera</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-car"></q-icon>
      <span class="q-ml-md">ion-ios-car</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-card"></q-icon>
      <span class="q-ml-md">ion-ios-card</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-cart"></q-icon>
      <span class="q-ml-md">ion-ios-cart</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-cash"></q-icon>
      <span class="q-ml-md">ion-ios-cash</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-cellular"></q-icon>
      <span class="q-ml-md">ion-ios-cellular</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-chatboxes"></q-icon>
      <span class="q-ml-md">ion-ios-chatboxes</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-chatbubbles"></q-icon>
      <span class="q-ml-md">ion-ios-chatbubbles</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-checkbox"></q-icon>
      <span class="q-ml-md">ion-ios-checkbox</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-checkbox-outline"></q-icon>
      <span class="q-ml-md">ion-ios-checkbox-outline</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-checkmark"></q-icon>
      <span class="q-ml-md">ion-ios-checkmark</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-checkmark-circle"></q-icon>
      <span class="q-ml-md">ion-ios-checkmark-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-checkmark-circle-outline"></q-icon>
      <span class="q-ml-md">ion-ios-checkmark-circle-outline</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-clipboard"></q-icon>
      <span class="q-ml-md">ion-ios-clipboard</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-clock"></q-icon>
      <span class="q-ml-md">ion-ios-clock</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-close"></q-icon>
      <span class="q-ml-md">ion-ios-close</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-close-circle"></q-icon>
      <span class="q-ml-md">ion-ios-close-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-close-circle-outline"></q-icon>
      <span class="q-ml-md">ion-ios-close-circle-outline</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-cloud"></q-icon>
      <span class="q-ml-md">ion-ios-cloud</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-cloud-circle"></q-icon>
      <span class="q-ml-md">ion-ios-cloud-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-cloud-done"></q-icon>
      <span class="q-ml-md">ion-ios-cloud-done</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-cloud-download"></q-icon>
      <span class="q-ml-md">ion-ios-cloud-download</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-cloud-outline"></q-icon>
      <span class="q-ml-md">ion-ios-cloud-outline</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-cloud-upload"></q-icon>
      <span class="q-ml-md">ion-ios-cloud-upload</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-cloudy"></q-icon>
      <span class="q-ml-md">ion-ios-cloudy</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-cloudy-night"></q-icon>
      <span class="q-ml-md">ion-ios-cloudy-night</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-code"></q-icon>
      <span class="q-ml-md">ion-ios-code</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-code-download"></q-icon>
      <span class="q-ml-md">ion-ios-code-download</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-code-working"></q-icon>
      <span class="q-ml-md">ion-ios-code-working</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-cog"></q-icon>
      <span class="q-ml-md">ion-ios-cog</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-color-fill"></q-icon>
      <span class="q-ml-md">ion-ios-color-fill</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-color-filter"></q-icon>
      <span class="q-ml-md">ion-ios-color-filter</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-color-palette"></q-icon>
      <span class="q-ml-md">ion-ios-color-palette</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-color-wand"></q-icon>
      <span class="q-ml-md">ion-ios-color-wand</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-compass"></q-icon>
      <span class="q-ml-md">ion-ios-compass</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-construct"></q-icon>
      <span class="q-ml-md">ion-ios-construct</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-contact"></q-icon>
      <span class="q-ml-md">ion-ios-contact</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-contacts"></q-icon>
      <span class="q-ml-md">ion-ios-contacts</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-contract"></q-icon>
      <span class="q-ml-md">ion-ios-contract</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-contrast"></q-icon>
      <span class="q-ml-md">ion-ios-contrast</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-copy"></q-icon>
      <span class="q-ml-md">ion-ios-copy</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-create"></q-icon>
      <span class="q-ml-md">ion-ios-create</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-crop"></q-icon>
      <span class="q-ml-md">ion-ios-crop</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-cube"></q-icon>
      <span class="q-ml-md">ion-ios-cube</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-cut"></q-icon>
      <span class="q-ml-md">ion-ios-cut</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-desktop"></q-icon>
      <span class="q-ml-md">ion-ios-desktop</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-disc"></q-icon>
      <span class="q-ml-md">ion-ios-disc</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-document"></q-icon>
      <span class="q-ml-md">ion-ios-document</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-done-all"></q-icon>
      <span class="q-ml-md">ion-ios-done-all</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-download"></q-icon>
      <span class="q-ml-md">ion-ios-download</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-easel"></q-icon>
      <span class="q-ml-md">ion-ios-easel</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-egg"></q-icon>
      <span class="q-ml-md">ion-ios-egg</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-exit"></q-icon>
      <span class="q-ml-md">ion-ios-exit</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-expand"></q-icon>
      <span class="q-ml-md">ion-ios-expand</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-eye"></q-icon>
      <span class="q-ml-md">ion-ios-eye</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-eye-off"></q-icon>
      <span class="q-ml-md">ion-ios-eye-off</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-fastforward"></q-icon>
      <span class="q-ml-md">ion-ios-fastforward</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-female"></q-icon>
      <span class="q-ml-md">ion-ios-female</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-filing"></q-icon>
      <span class="q-ml-md">ion-ios-filing</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-film"></q-icon>
      <span class="q-ml-md">ion-ios-film</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-finger-print"></q-icon>
      <span class="q-ml-md">ion-ios-finger-print</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-fitness"></q-icon>
      <span class="q-ml-md">ion-ios-fitness</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-flag"></q-icon>
      <span class="q-ml-md">ion-ios-flag</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-flame"></q-icon>
      <span class="q-ml-md">ion-ios-flame</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-flash"></q-icon>
      <span class="q-ml-md">ion-ios-flash</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-flash-off"></q-icon>
      <span class="q-ml-md">ion-ios-flash-off</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-flashlight"></q-icon>
      <span class="q-ml-md">ion-ios-flashlight</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-flask"></q-icon>
      <span class="q-ml-md">ion-ios-flask</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-flower"></q-icon>
      <span class="q-ml-md">ion-ios-flower</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-folder"></q-icon>
      <span class="q-ml-md">ion-ios-folder</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-folder-open"></q-icon>
      <span class="q-ml-md">ion-ios-folder-open</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-football"></q-icon>
      <span class="q-ml-md">ion-ios-football</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-funnel"></q-icon>
      <span class="q-ml-md">ion-ios-funnel</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-gift"></q-icon>
      <span class="q-ml-md">ion-ios-gift</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-git-branch"></q-icon>
      <span class="q-ml-md">ion-ios-git-branch</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-git-commit"></q-icon>
      <span class="q-ml-md">ion-ios-git-commit</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-git-compare"></q-icon>
      <span class="q-ml-md">ion-ios-git-compare</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-git-merge"></q-icon>
      <span class="q-ml-md">ion-ios-git-merge</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-git-network"></q-icon>
      <span class="q-ml-md">ion-ios-git-network</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-git-pull-request"></q-icon>
      <span class="q-ml-md">ion-ios-git-pull-request</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-glasses"></q-icon>
      <span class="q-ml-md">ion-ios-glasses</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-globe"></q-icon>
      <span class="q-ml-md">ion-ios-globe</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-grid"></q-icon>
      <span class="q-ml-md">ion-ios-grid</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-hammer"></q-icon>
      <span class="q-ml-md">ion-ios-hammer</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-hand"></q-icon>
      <span class="q-ml-md">ion-ios-hand</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-happy"></q-icon>
      <span class="q-ml-md">ion-ios-happy</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-headset"></q-icon>
      <span class="q-ml-md">ion-ios-headset</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-heart"></q-icon>
      <span class="q-ml-md">ion-ios-heart</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-heart-dislike"></q-icon>
      <span class="q-ml-md">ion-ios-heart-dislike</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-heart-empty"></q-icon>
      <span class="q-ml-md">ion-ios-heart-empty</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-heart-half"></q-icon>
      <span class="q-ml-md">ion-ios-heart-half</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-help"></q-icon>
      <span class="q-ml-md">ion-ios-help</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-help-buoy"></q-icon>
      <span class="q-ml-md">ion-ios-help-buoy</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-help-circle"></q-icon>
      <span class="q-ml-md">ion-ios-help-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-help-circle-outline"></q-icon>
      <span class="q-ml-md">ion-ios-help-circle-outline</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-home"></q-icon>
      <span class="q-ml-md">ion-ios-home</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-hourglass"></q-icon>
      <span class="q-ml-md">ion-ios-hourglass</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-ice-cream"></q-icon>
      <span class="q-ml-md">ion-ios-ice-cream</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-image"></q-icon>
      <span class="q-ml-md">ion-ios-image</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-images"></q-icon>
      <span class="q-ml-md">ion-ios-images</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-infinite"></q-icon>
      <span class="q-ml-md">ion-ios-infinite</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-information"></q-icon>
      <span class="q-ml-md">ion-ios-information</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-information-circle"></q-icon>
      <span class="q-ml-md">ion-ios-information-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-information-circle-outline"></q-icon>
      <span class="q-ml-md">ion-ios-information-circle-outline</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-jet"></q-icon>
      <span class="q-ml-md">ion-ios-jet</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-journal"></q-icon>
      <span class="q-ml-md">ion-ios-journal</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-key"></q-icon>
      <span class="q-ml-md">ion-ios-key</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-keypad"></q-icon>
      <span class="q-ml-md">ion-ios-keypad</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-laptop"></q-icon>
      <span class="q-ml-md">ion-ios-laptop</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-leaf"></q-icon>
      <span class="q-ml-md">ion-ios-leaf</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-link"></q-icon>
      <span class="q-ml-md">ion-ios-link</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-list"></q-icon>
      <span class="q-ml-md">ion-ios-list</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-list-box"></q-icon>
      <span class="q-ml-md">ion-ios-list-box</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-locate"></q-icon>
      <span class="q-ml-md">ion-ios-locate</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-lock"></q-icon>
      <span class="q-ml-md">ion-ios-lock</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-log-in"></q-icon>
      <span class="q-ml-md">ion-ios-log-in</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-log-out"></q-icon>
      <span class="q-ml-md">ion-ios-log-out</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-magnet"></q-icon>
      <span class="q-ml-md">ion-ios-magnet</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-mail"></q-icon>
      <span class="q-ml-md">ion-ios-mail</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-mail-open"></q-icon>
      <span class="q-ml-md">ion-ios-mail-open</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-mail-unread"></q-icon>
      <span class="q-ml-md">ion-ios-mail-unread</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-male"></q-icon>
      <span class="q-ml-md">ion-ios-male</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-man"></q-icon>
      <span class="q-ml-md">ion-ios-man</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-map"></q-icon>
      <span class="q-ml-md">ion-ios-map</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-medal"></q-icon>
      <span class="q-ml-md">ion-ios-medal</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-medical"></q-icon>
      <span class="q-ml-md">ion-ios-medical</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-medkit"></q-icon>
      <span class="q-ml-md">ion-ios-medkit</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-megaphone"></q-icon>
      <span class="q-ml-md">ion-ios-megaphone</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-menu"></q-icon>
      <span class="q-ml-md">ion-ios-menu</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-mic"></q-icon>
      <span class="q-ml-md">ion-ios-mic</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-mic-off"></q-icon>
      <span class="q-ml-md">ion-ios-mic-off</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-microphone"></q-icon>
      <span class="q-ml-md">ion-ios-microphone</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-moon"></q-icon>
      <span class="q-ml-md">ion-ios-moon</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-more"></q-icon>
      <span class="q-ml-md">ion-ios-more</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-move"></q-icon>
      <span class="q-ml-md">ion-ios-move</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-musical-note"></q-icon>
      <span class="q-ml-md">ion-ios-musical-note</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-musical-notes"></q-icon>
      <span class="q-ml-md">ion-ios-musical-notes</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-navigate"></q-icon>
      <span class="q-ml-md">ion-ios-navigate</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-notifications"></q-icon>
      <span class="q-ml-md">ion-ios-notifications</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-notifications-off"></q-icon>
      <span class="q-ml-md">ion-ios-notifications-off</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-notifications-outline"></q-icon>
      <span class="q-ml-md">ion-ios-notifications-outline</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-nuclear"></q-icon>
      <span class="q-ml-md">ion-ios-nuclear</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-nutrition"></q-icon>
      <span class="q-ml-md">ion-ios-nutrition</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-open"></q-icon>
      <span class="q-ml-md">ion-ios-open</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-options"></q-icon>
      <span class="q-ml-md">ion-ios-options</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-outlet"></q-icon>
      <span class="q-ml-md">ion-ios-outlet</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-paper"></q-icon>
      <span class="q-ml-md">ion-ios-paper</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-paper-plane"></q-icon>
      <span class="q-ml-md">ion-ios-paper-plane</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-partly-sunny"></q-icon>
      <span class="q-ml-md">ion-ios-partly-sunny</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-pause"></q-icon>
      <span class="q-ml-md">ion-ios-pause</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-paw"></q-icon>
      <span class="q-ml-md">ion-ios-paw</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-people"></q-icon>
      <span class="q-ml-md">ion-ios-people</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-person"></q-icon>
      <span class="q-ml-md">ion-ios-person</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-person-add"></q-icon>
      <span class="q-ml-md">ion-ios-person-add</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-phone-landscape"></q-icon>
      <span class="q-ml-md">ion-ios-phone-landscape</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-phone-portrait"></q-icon>
      <span class="q-ml-md">ion-ios-phone-portrait</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-photos"></q-icon>
      <span class="q-ml-md">ion-ios-photos</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-pie"></q-icon>
      <span class="q-ml-md">ion-ios-pie</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-pin"></q-icon>
      <span class="q-ml-md">ion-ios-pin</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-pint"></q-icon>
      <span class="q-ml-md">ion-ios-pint</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-pizza"></q-icon>
      <span class="q-ml-md">ion-ios-pizza</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-planet"></q-icon>
      <span class="q-ml-md">ion-ios-planet</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-play"></q-icon>
      <span class="q-ml-md">ion-ios-play</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-play-circle"></q-icon>
      <span class="q-ml-md">ion-ios-play-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-podium"></q-icon>
      <span class="q-ml-md">ion-ios-podium</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-power"></q-icon>
      <span class="q-ml-md">ion-ios-power</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-pricetag"></q-icon>
      <span class="q-ml-md">ion-ios-pricetag</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-pricetags"></q-icon>
      <span class="q-ml-md">ion-ios-pricetags</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-print"></q-icon>
      <span class="q-ml-md">ion-ios-print</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-pulse"></q-icon>
      <span class="q-ml-md">ion-ios-pulse</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-qr-scanner"></q-icon>
      <span class="q-ml-md">ion-ios-qr-scanner</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-quote"></q-icon>
      <span class="q-ml-md">ion-ios-quote</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-radio"></q-icon>
      <span class="q-ml-md">ion-ios-radio</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-radio-button-off"></q-icon>
      <span class="q-ml-md">ion-ios-radio-button-off</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-radio-button-on"></q-icon>
      <span class="q-ml-md">ion-ios-radio-button-on</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-rainy"></q-icon>
      <span class="q-ml-md">ion-ios-rainy</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-recording"></q-icon>
      <span class="q-ml-md">ion-ios-recording</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-redo"></q-icon>
      <span class="q-ml-md">ion-ios-redo</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-refresh"></q-icon>
      <span class="q-ml-md">ion-ios-refresh</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-refresh-circle"></q-icon>
      <span class="q-ml-md">ion-ios-refresh-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-remove"></q-icon>
      <span class="q-ml-md">ion-ios-remove</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-remove-circle"></q-icon>
      <span class="q-ml-md">ion-ios-remove-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-remove-circle-outline"></q-icon>
      <span class="q-ml-md">ion-ios-remove-circle-outline</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-reorder"></q-icon>
      <span class="q-ml-md">ion-ios-reorder</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-repeat"></q-icon>
      <span class="q-ml-md">ion-ios-repeat</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-resize"></q-icon>
      <span class="q-ml-md">ion-ios-resize</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-restaurant"></q-icon>
      <span class="q-ml-md">ion-ios-restaurant</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-return-left"></q-icon>
      <span class="q-ml-md">ion-ios-return-left</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-return-right"></q-icon>
      <span class="q-ml-md">ion-ios-return-right</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-reverse-camera"></q-icon>
      <span class="q-ml-md">ion-ios-reverse-camera</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-rewind"></q-icon>
      <span class="q-ml-md">ion-ios-rewind</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-ribbon"></q-icon>
      <span class="q-ml-md">ion-ios-ribbon</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-rocket"></q-icon>
      <span class="q-ml-md">ion-ios-rocket</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-rose"></q-icon>
      <span class="q-ml-md">ion-ios-rose</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-sad"></q-icon>
      <span class="q-ml-md">ion-ios-sad</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-save"></q-icon>
      <span class="q-ml-md">ion-ios-save</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-school"></q-icon>
      <span class="q-ml-md">ion-ios-school</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-search"></q-icon>
      <span class="q-ml-md">ion-ios-search</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-send"></q-icon>
      <span class="q-ml-md">ion-ios-send</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-settings"></q-icon>
      <span class="q-ml-md">ion-ios-settings</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-share"></q-icon>
      <span class="q-ml-md">ion-ios-share</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-share-alt"></q-icon>
      <span class="q-ml-md">ion-ios-share-alt</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-shirt"></q-icon>
      <span class="q-ml-md">ion-ios-shirt</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-shuffle"></q-icon>
      <span class="q-ml-md">ion-ios-shuffle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-skip-backward"></q-icon>
      <span class="q-ml-md">ion-ios-skip-backward</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-skip-forward"></q-icon>
      <span class="q-ml-md">ion-ios-skip-forward</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-snow"></q-icon>
      <span class="q-ml-md">ion-ios-snow</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-speedometer"></q-icon>
      <span class="q-ml-md">ion-ios-speedometer</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-square"></q-icon>
      <span class="q-ml-md">ion-ios-square</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-square-outline"></q-icon>
      <span class="q-ml-md">ion-ios-square-outline</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-star"></q-icon>
      <span class="q-ml-md">ion-ios-star</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-star-half"></q-icon>
      <span class="q-ml-md">ion-ios-star-half</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-star-outline"></q-icon>
      <span class="q-ml-md">ion-ios-star-outline</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-stats"></q-icon>
      <span class="q-ml-md">ion-ios-stats</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-stopwatch"></q-icon>
      <span class="q-ml-md">ion-ios-stopwatch</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-subway"></q-icon>
      <span class="q-ml-md">ion-ios-subway</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-sunny"></q-icon>
      <span class="q-ml-md">ion-ios-sunny</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-swap"></q-icon>
      <span class="q-ml-md">ion-ios-swap</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-switch"></q-icon>
      <span class="q-ml-md">ion-ios-switch</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-sync"></q-icon>
      <span class="q-ml-md">ion-ios-sync</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-tablet-landscape"></q-icon>
      <span class="q-ml-md">ion-ios-tablet-landscape</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-tablet-portrait"></q-icon>
      <span class="q-ml-md">ion-ios-tablet-portrait</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-tennisball"></q-icon>
      <span class="q-ml-md">ion-ios-tennisball</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-text"></q-icon>
      <span class="q-ml-md">ion-ios-text</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-thermometer"></q-icon>
      <span class="q-ml-md">ion-ios-thermometer</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-thumbs-down"></q-icon>
      <span class="q-ml-md">ion-ios-thumbs-down</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-thumbs-up"></q-icon>
      <span class="q-ml-md">ion-ios-thumbs-up</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-thunderstorm"></q-icon>
      <span class="q-ml-md">ion-ios-thunderstorm</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-time"></q-icon>
      <span class="q-ml-md">ion-ios-time</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-timer"></q-icon>
      <span class="q-ml-md">ion-ios-timer</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-today"></q-icon>
      <span class="q-ml-md">ion-ios-today</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-train"></q-icon>
      <span class="q-ml-md">ion-ios-train</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-transgender"></q-icon>
      <span class="q-ml-md">ion-ios-transgender</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-trash"></q-icon>
      <span class="q-ml-md">ion-ios-trash</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-trending-down"></q-icon>
      <span class="q-ml-md">ion-ios-trending-down</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-trending-up"></q-icon>
      <span class="q-ml-md">ion-ios-trending-up</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-trophy"></q-icon>
      <span class="q-ml-md">ion-ios-trophy</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-tv"></q-icon>
      <span class="q-ml-md">ion-ios-tv</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-umbrella"></q-icon>
      <span class="q-ml-md">ion-ios-umbrella</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-undo"></q-icon>
      <span class="q-ml-md">ion-ios-undo</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-unlock"></q-icon>
      <span class="q-ml-md">ion-ios-unlock</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-videocam"></q-icon>
      <span class="q-ml-md">ion-ios-videocam</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-volume-high"></q-icon>
      <span class="q-ml-md">ion-ios-volume-high</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-volume-low"></q-icon>
      <span class="q-ml-md">ion-ios-volume-low</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-volume-mute"></q-icon>
      <span class="q-ml-md">ion-ios-volume-mute</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-volume-off"></q-icon>
      <span class="q-ml-md">ion-ios-volume-off</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-walk"></q-icon>
      <span class="q-ml-md">ion-ios-walk</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-wallet"></q-icon>
      <span class="q-ml-md">ion-ios-wallet</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-warning"></q-icon>
      <span class="q-ml-md">ion-ios-warning</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-watch"></q-icon>
      <span class="q-ml-md">ion-ios-watch</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-water"></q-icon>
      <span class="q-ml-md">ion-ios-water</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-wifi"></q-icon>
      <span class="q-ml-md">ion-ios-wifi</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-wine"></q-icon>
      <span class="q-ml-md">ion-ios-wine</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-ios-woman"></q-icon>
      <span class="q-ml-md">ion-ios-woman</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-android"></q-icon>
      <span class="q-ml-md">ion-logo-android</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-angular"></q-icon>
      <span class="q-ml-md">ion-logo-angular</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-apple"></q-icon>
      <span class="q-ml-md">ion-logo-apple</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-bitbucket"></q-icon>
      <span class="q-ml-md">ion-logo-bitbucket</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-bitcoin"></q-icon>
      <span class="q-ml-md">ion-logo-bitcoin</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-buffer"></q-icon>
      <span class="q-ml-md">ion-logo-buffer</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-chrome"></q-icon>
      <span class="q-ml-md">ion-logo-chrome</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-closed-captioning"></q-icon>
      <span class="q-ml-md">ion-logo-closed-captioning</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-codepen"></q-icon>
      <span class="q-ml-md">ion-logo-codepen</span>
    </div>
    .ion-logo-css3:before {
    content: "\f231";
    }

    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-designernews"></q-icon>
      <span class="q-ml-md">ion-logo-designernews</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-dribbble"></q-icon>
      <span class="q-ml-md">ion-logo-dribbble</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-dropbox"></q-icon>
      <span class="q-ml-md">ion-logo-dropbox</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-euro"></q-icon>
      <span class="q-ml-md">ion-logo-euro</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-facebook"></q-icon>
      <span class="q-ml-md">ion-logo-facebook</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-flickr"></q-icon>
      <span class="q-ml-md">ion-logo-flickr</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-foursquare"></q-icon>
      <span class="q-ml-md">ion-logo-foursquare</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-freebsd-devil"></q-icon>
      <span class="q-ml-md">ion-logo-freebsd-devil</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-game-controller-a"></q-icon>
      <span class="q-ml-md">ion-logo-game-controller-a</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-game-controller-b"></q-icon>
      <span class="q-ml-md">ion-logo-game-controller-b</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-github"></q-icon>
      <span class="q-ml-md">ion-logo-github</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-google"></q-icon>
      <span class="q-ml-md">ion-logo-google</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-googleplus"></q-icon>
      <span class="q-ml-md">ion-logo-googleplus</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-hackernews"></q-icon>
      <span class="q-ml-md">ion-logo-hackernews</span>
    </div>
    .ion-logo-html5:before {
    content: "\f23d";
    }

    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-instagram"></q-icon>
      <span class="q-ml-md">ion-logo-instagram</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-ionic"></q-icon>
      <span class="q-ml-md">ion-logo-ionic</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-ionitron"></q-icon>
      <span class="q-ml-md">ion-logo-ionitron</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-javascript"></q-icon>
      <span class="q-ml-md">ion-logo-javascript</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-linkedin"></q-icon>
      <span class="q-ml-md">ion-logo-linkedin</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-markdown"></q-icon>
      <span class="q-ml-md">ion-logo-markdown</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-model-s"></q-icon>
      <span class="q-ml-md">ion-logo-model-s</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-no-smoking"></q-icon>
      <span class="q-ml-md">ion-logo-no-smoking</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-nodejs"></q-icon>
      <span class="q-ml-md">ion-logo-nodejs</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-npm"></q-icon>
      <span class="q-ml-md">ion-logo-npm</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-octocat"></q-icon>
      <span class="q-ml-md">ion-logo-octocat</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-pinterest"></q-icon>
      <span class="q-ml-md">ion-logo-pinterest</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-playstation"></q-icon>
      <span class="q-ml-md">ion-logo-playstation</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-polymer"></q-icon>
      <span class="q-ml-md">ion-logo-polymer</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-python"></q-icon>
      <span class="q-ml-md">ion-logo-python</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-reddit"></q-icon>
      <span class="q-ml-md">ion-logo-reddit</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-rss"></q-icon>
      <span class="q-ml-md">ion-logo-rss</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-sass"></q-icon>
      <span class="q-ml-md">ion-logo-sass</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-skype"></q-icon>
      <span class="q-ml-md">ion-logo-skype</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-slack"></q-icon>
      <span class="q-ml-md">ion-logo-slack</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-snapchat"></q-icon>
      <span class="q-ml-md">ion-logo-snapchat</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-steam"></q-icon>
      <span class="q-ml-md">ion-logo-steam</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-tumblr"></q-icon>
      <span class="q-ml-md">ion-logo-tumblr</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-tux"></q-icon>
      <span class="q-ml-md">ion-logo-tux</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-twitch"></q-icon>
      <span class="q-ml-md">ion-logo-twitch</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-twitter"></q-icon>
      <span class="q-ml-md">ion-logo-twitter</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-usd"></q-icon>
      <span class="q-ml-md">ion-logo-usd</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-vimeo"></q-icon>
      <span class="q-ml-md">ion-logo-vimeo</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-vk"></q-icon>
      <span class="q-ml-md">ion-logo-vk</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-whatsapp"></q-icon>
      <span class="q-ml-md">ion-logo-whatsapp</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-windows"></q-icon>
      <span class="q-ml-md">ion-logo-windows</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-wordpress"></q-icon>
      <span class="q-ml-md">ion-logo-wordpress</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-xbox"></q-icon>
      <span class="q-ml-md">ion-logo-xbox</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-xing"></q-icon>
      <span class="q-ml-md">ion-logo-xing</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-yahoo"></q-icon>
      <span class="q-ml-md">ion-logo-yahoo</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-yen"></q-icon>
      <span class="q-ml-md">ion-logo-yen</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-logo-youtube"></q-icon>
      <span class="q-ml-md">ion-logo-youtube</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-add"></q-icon>
      <span class="q-ml-md">ion-md-add</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-add-circle"></q-icon>
      <span class="q-ml-md">ion-md-add-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-add-circle-outline"></q-icon>
      <span class="q-ml-md">ion-md-add-circle-outline</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-airplane"></q-icon>
      <span class="q-ml-md">ion-md-airplane</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-alarm"></q-icon>
      <span class="q-ml-md">ion-md-alarm</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-albums"></q-icon>
      <span class="q-ml-md">ion-md-albums</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-alert"></q-icon>
      <span class="q-ml-md">ion-md-alert</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-american-football"></q-icon>
      <span class="q-ml-md">ion-md-american-football</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-analytics"></q-icon>
      <span class="q-ml-md">ion-md-analytics</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-aperture"></q-icon>
      <span class="q-ml-md">ion-md-aperture</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-apps"></q-icon>
      <span class="q-ml-md">ion-md-apps</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-appstore"></q-icon>
      <span class="q-ml-md">ion-md-appstore</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-archive"></q-icon>
      <span class="q-ml-md">ion-md-archive</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-arrow-back"></q-icon>
      <span class="q-ml-md">ion-md-arrow-back</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-arrow-down"></q-icon>
      <span class="q-ml-md">ion-md-arrow-down</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-arrow-dropdown"></q-icon>
      <span class="q-ml-md">ion-md-arrow-dropdown</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-arrow-dropdown-circle"></q-icon>
      <span class="q-ml-md">ion-md-arrow-dropdown-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-arrow-dropleft"></q-icon>
      <span class="q-ml-md">ion-md-arrow-dropleft</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-arrow-dropleft-circle"></q-icon>
      <span class="q-ml-md">ion-md-arrow-dropleft-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-arrow-dropright"></q-icon>
      <span class="q-ml-md">ion-md-arrow-dropright</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-arrow-dropright-circle"></q-icon>
      <span class="q-ml-md">ion-md-arrow-dropright-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-arrow-dropup"></q-icon>
      <span class="q-ml-md">ion-md-arrow-dropup</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-arrow-dropup-circle"></q-icon>
      <span class="q-ml-md">ion-md-arrow-dropup-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-arrow-forward"></q-icon>
      <span class="q-ml-md">ion-md-arrow-forward</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-arrow-round-back"></q-icon>
      <span class="q-ml-md">ion-md-arrow-round-back</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-arrow-round-down"></q-icon>
      <span class="q-ml-md">ion-md-arrow-round-down</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-arrow-round-forward"></q-icon>
      <span class="q-ml-md">ion-md-arrow-round-forward</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-arrow-round-up"></q-icon>
      <span class="q-ml-md">ion-md-arrow-round-up</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-arrow-up"></q-icon>
      <span class="q-ml-md">ion-md-arrow-up</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-at"></q-icon>
      <span class="q-ml-md">ion-md-at</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-attach"></q-icon>
      <span class="q-ml-md">ion-md-attach</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-backspace"></q-icon>
      <span class="q-ml-md">ion-md-backspace</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-barcode"></q-icon>
      <span class="q-ml-md">ion-md-barcode</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-baseball"></q-icon>
      <span class="q-ml-md">ion-md-baseball</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-basket"></q-icon>
      <span class="q-ml-md">ion-md-basket</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-basketball"></q-icon>
      <span class="q-ml-md">ion-md-basketball</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-battery-charging"></q-icon>
      <span class="q-ml-md">ion-md-battery-charging</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-battery-dead"></q-icon>
      <span class="q-ml-md">ion-md-battery-dead</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-battery-full"></q-icon>
      <span class="q-ml-md">ion-md-battery-full</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-beaker"></q-icon>
      <span class="q-ml-md">ion-md-beaker</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-bed"></q-icon>
      <span class="q-ml-md">ion-md-bed</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-beer"></q-icon>
      <span class="q-ml-md">ion-md-beer</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-bicycle"></q-icon>
      <span class="q-ml-md">ion-md-bicycle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-bluetooth"></q-icon>
      <span class="q-ml-md">ion-md-bluetooth</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-boat"></q-icon>
      <span class="q-ml-md">ion-md-boat</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-body"></q-icon>
      <span class="q-ml-md">ion-md-body</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-bonfire"></q-icon>
      <span class="q-ml-md">ion-md-bonfire</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-book"></q-icon>
      <span class="q-ml-md">ion-md-book</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-bookmark"></q-icon>
      <span class="q-ml-md">ion-md-bookmark</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-bookmarks"></q-icon>
      <span class="q-ml-md">ion-md-bookmarks</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-bowtie"></q-icon>
      <span class="q-ml-md">ion-md-bowtie</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-briefcase"></q-icon>
      <span class="q-ml-md">ion-md-briefcase</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-browsers"></q-icon>
      <span class="q-ml-md">ion-md-browsers</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-brush"></q-icon>
      <span class="q-ml-md">ion-md-brush</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-bug"></q-icon>
      <span class="q-ml-md">ion-md-bug</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-build"></q-icon>
      <span class="q-ml-md">ion-md-build</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-bulb"></q-icon>
      <span class="q-ml-md">ion-md-bulb</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-bus"></q-icon>
      <span class="q-ml-md">ion-md-bus</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-business"></q-icon>
      <span class="q-ml-md">ion-md-business</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-cafe"></q-icon>
      <span class="q-ml-md">ion-md-cafe</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-calculator"></q-icon>
      <span class="q-ml-md">ion-md-calculator</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-calendar"></q-icon>
      <span class="q-ml-md">ion-md-calendar</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-call"></q-icon>
      <span class="q-ml-md">ion-md-call</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-camera"></q-icon>
      <span class="q-ml-md">ion-md-camera</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-car"></q-icon>
      <span class="q-ml-md">ion-md-car</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-card"></q-icon>
      <span class="q-ml-md">ion-md-card</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-cart"></q-icon>
      <span class="q-ml-md">ion-md-cart</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-cash"></q-icon>
      <span class="q-ml-md">ion-md-cash</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-cellular"></q-icon>
      <span class="q-ml-md">ion-md-cellular</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-chatboxes"></q-icon>
      <span class="q-ml-md">ion-md-chatboxes</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-chatbubbles"></q-icon>
      <span class="q-ml-md">ion-md-chatbubbles</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-checkbox"></q-icon>
      <span class="q-ml-md">ion-md-checkbox</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-checkbox-outline"></q-icon>
      <span class="q-ml-md">ion-md-checkbox-outline</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-checkmark"></q-icon>
      <span class="q-ml-md">ion-md-checkmark</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-checkmark-circle"></q-icon>
      <span class="q-ml-md">ion-md-checkmark-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-checkmark-circle-outline"></q-icon>
      <span class="q-ml-md">ion-md-checkmark-circle-outline</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-clipboard"></q-icon>
      <span class="q-ml-md">ion-md-clipboard</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-clock"></q-icon>
      <span class="q-ml-md">ion-md-clock</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-close"></q-icon>
      <span class="q-ml-md">ion-md-close</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-close-circle"></q-icon>
      <span class="q-ml-md">ion-md-close-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-close-circle-outline"></q-icon>
      <span class="q-ml-md">ion-md-close-circle-outline</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-cloud"></q-icon>
      <span class="q-ml-md">ion-md-cloud</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-cloud-circle"></q-icon>
      <span class="q-ml-md">ion-md-cloud-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-cloud-done"></q-icon>
      <span class="q-ml-md">ion-md-cloud-done</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-cloud-download"></q-icon>
      <span class="q-ml-md">ion-md-cloud-download</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-cloud-outline"></q-icon>
      <span class="q-ml-md">ion-md-cloud-outline</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-cloud-upload"></q-icon>
      <span class="q-ml-md">ion-md-cloud-upload</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-cloudy"></q-icon>
      <span class="q-ml-md">ion-md-cloudy</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-cloudy-night"></q-icon>
      <span class="q-ml-md">ion-md-cloudy-night</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-code"></q-icon>
      <span class="q-ml-md">ion-md-code</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-code-download"></q-icon>
      <span class="q-ml-md">ion-md-code-download</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-code-working"></q-icon>
      <span class="q-ml-md">ion-md-code-working</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-cog"></q-icon>
      <span class="q-ml-md">ion-md-cog</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-color-fill"></q-icon>
      <span class="q-ml-md">ion-md-color-fill</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-color-filter"></q-icon>
      <span class="q-ml-md">ion-md-color-filter</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-color-palette"></q-icon>
      <span class="q-ml-md">ion-md-color-palette</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-color-wand"></q-icon>
      <span class="q-ml-md">ion-md-color-wand</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-compass"></q-icon>
      <span class="q-ml-md">ion-md-compass</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-construct"></q-icon>
      <span class="q-ml-md">ion-md-construct</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-contact"></q-icon>
      <span class="q-ml-md">ion-md-contact</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-contacts"></q-icon>
      <span class="q-ml-md">ion-md-contacts</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-contract"></q-icon>
      <span class="q-ml-md">ion-md-contract</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-contrast"></q-icon>
      <span class="q-ml-md">ion-md-contrast</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-copy"></q-icon>
      <span class="q-ml-md">ion-md-copy</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-create"></q-icon>
      <span class="q-ml-md">ion-md-create</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-crop"></q-icon>
      <span class="q-ml-md">ion-md-crop</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-cube"></q-icon>
      <span class="q-ml-md">ion-md-cube</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-cut"></q-icon>
      <span class="q-ml-md">ion-md-cut</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-desktop"></q-icon>
      <span class="q-ml-md">ion-md-desktop</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-disc"></q-icon>
      <span class="q-ml-md">ion-md-disc</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-document"></q-icon>
      <span class="q-ml-md">ion-md-document</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-done-all"></q-icon>
      <span class="q-ml-md">ion-md-done-all</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-download"></q-icon>
      <span class="q-ml-md">ion-md-download</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-easel"></q-icon>
      <span class="q-ml-md">ion-md-easel</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-egg"></q-icon>
      <span class="q-ml-md">ion-md-egg</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-exit"></q-icon>
      <span class="q-ml-md">ion-md-exit</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-expand"></q-icon>
      <span class="q-ml-md">ion-md-expand</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-eye"></q-icon>
      <span class="q-ml-md">ion-md-eye</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-eye-off"></q-icon>
      <span class="q-ml-md">ion-md-eye-off</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-fastforward"></q-icon>
      <span class="q-ml-md">ion-md-fastforward</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-female"></q-icon>
      <span class="q-ml-md">ion-md-female</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-filing"></q-icon>
      <span class="q-ml-md">ion-md-filing</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-film"></q-icon>
      <span class="q-ml-md">ion-md-film</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-finger-print"></q-icon>
      <span class="q-ml-md">ion-md-finger-print</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-fitness"></q-icon>
      <span class="q-ml-md">ion-md-fitness</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-flag"></q-icon>
      <span class="q-ml-md">ion-md-flag</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-flame"></q-icon>
      <span class="q-ml-md">ion-md-flame</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-flash"></q-icon>
      <span class="q-ml-md">ion-md-flash</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-flash-off"></q-icon>
      <span class="q-ml-md">ion-md-flash-off</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-flashlight"></q-icon>
      <span class="q-ml-md">ion-md-flashlight</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-flask"></q-icon>
      <span class="q-ml-md">ion-md-flask</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-flower"></q-icon>
      <span class="q-ml-md">ion-md-flower</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-folder"></q-icon>
      <span class="q-ml-md">ion-md-folder</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-folder-open"></q-icon>
      <span class="q-ml-md">ion-md-folder-open</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-football"></q-icon>
      <span class="q-ml-md">ion-md-football</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-funnel"></q-icon>
      <span class="q-ml-md">ion-md-funnel</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-gift"></q-icon>
      <span class="q-ml-md">ion-md-gift</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-git-branch"></q-icon>
      <span class="q-ml-md">ion-md-git-branch</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-git-commit"></q-icon>
      <span class="q-ml-md">ion-md-git-commit</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-git-compare"></q-icon>
      <span class="q-ml-md">ion-md-git-compare</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-git-merge"></q-icon>
      <span class="q-ml-md">ion-md-git-merge</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-git-network"></q-icon>
      <span class="q-ml-md">ion-md-git-network</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-git-pull-request"></q-icon>
      <span class="q-ml-md">ion-md-git-pull-request</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-glasses"></q-icon>
      <span class="q-ml-md">ion-md-glasses</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-globe"></q-icon>
      <span class="q-ml-md">ion-md-globe</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-grid"></q-icon>
      <span class="q-ml-md">ion-md-grid</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-hammer"></q-icon>
      <span class="q-ml-md">ion-md-hammer</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-hand"></q-icon>
      <span class="q-ml-md">ion-md-hand</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-happy"></q-icon>
      <span class="q-ml-md">ion-md-happy</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-headset"></q-icon>
      <span class="q-ml-md">ion-md-headset</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-heart"></q-icon>
      <span class="q-ml-md">ion-md-heart</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-heart-dislike"></q-icon>
      <span class="q-ml-md">ion-md-heart-dislike</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-heart-empty"></q-icon>
      <span class="q-ml-md">ion-md-heart-empty</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-heart-half"></q-icon>
      <span class="q-ml-md">ion-md-heart-half</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-help"></q-icon>
      <span class="q-ml-md">ion-md-help</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-help-buoy"></q-icon>
      <span class="q-ml-md">ion-md-help-buoy</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-help-circle"></q-icon>
      <span class="q-ml-md">ion-md-help-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-help-circle-outline"></q-icon>
      <span class="q-ml-md">ion-md-help-circle-outline</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-home"></q-icon>
      <span class="q-ml-md">ion-md-home</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-hourglass"></q-icon>
      <span class="q-ml-md">ion-md-hourglass</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-ice-cream"></q-icon>
      <span class="q-ml-md">ion-md-ice-cream</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-image"></q-icon>
      <span class="q-ml-md">ion-md-image</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-images"></q-icon>
      <span class="q-ml-md">ion-md-images</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-infinite"></q-icon>
      <span class="q-ml-md">ion-md-infinite</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-information"></q-icon>
      <span class="q-ml-md">ion-md-information</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-information-circle"></q-icon>
      <span class="q-ml-md">ion-md-information-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-information-circle-outline"></q-icon>
      <span class="q-ml-md">ion-md-information-circle-outline</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-jet"></q-icon>
      <span class="q-ml-md">ion-md-jet</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-journal"></q-icon>
      <span class="q-ml-md">ion-md-journal</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-key"></q-icon>
      <span class="q-ml-md">ion-md-key</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-keypad"></q-icon>
      <span class="q-ml-md">ion-md-keypad</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-laptop"></q-icon>
      <span class="q-ml-md">ion-md-laptop</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-leaf"></q-icon>
      <span class="q-ml-md">ion-md-leaf</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-link"></q-icon>
      <span class="q-ml-md">ion-md-link</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-list"></q-icon>
      <span class="q-ml-md">ion-md-list</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-list-box"></q-icon>
      <span class="q-ml-md">ion-md-list-box</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-locate"></q-icon>
      <span class="q-ml-md">ion-md-locate</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-lock"></q-icon>
      <span class="q-ml-md">ion-md-lock</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-log-in"></q-icon>
      <span class="q-ml-md">ion-md-log-in</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-log-out"></q-icon>
      <span class="q-ml-md">ion-md-log-out</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-magnet"></q-icon>
      <span class="q-ml-md">ion-md-magnet</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-mail"></q-icon>
      <span class="q-ml-md">ion-md-mail</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-mail-open"></q-icon>
      <span class="q-ml-md">ion-md-mail-open</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-mail-unread"></q-icon>
      <span class="q-ml-md">ion-md-mail-unread</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-male"></q-icon>
      <span class="q-ml-md">ion-md-male</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-man"></q-icon>
      <span class="q-ml-md">ion-md-man</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-map"></q-icon>
      <span class="q-ml-md">ion-md-map</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-medal"></q-icon>
      <span class="q-ml-md">ion-md-medal</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-medical"></q-icon>
      <span class="q-ml-md">ion-md-medical</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-medkit"></q-icon>
      <span class="q-ml-md">ion-md-medkit</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-megaphone"></q-icon>
      <span class="q-ml-md">ion-md-megaphone</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-menu"></q-icon>
      <span class="q-ml-md">ion-md-menu</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-mic"></q-icon>
      <span class="q-ml-md">ion-md-mic</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-mic-off"></q-icon>
      <span class="q-ml-md">ion-md-mic-off</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-microphone"></q-icon>
      <span class="q-ml-md">ion-md-microphone</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-moon"></q-icon>
      <span class="q-ml-md">ion-md-moon</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-more"></q-icon>
      <span class="q-ml-md">ion-md-more</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-move"></q-icon>
      <span class="q-ml-md">ion-md-move</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-musical-note"></q-icon>
      <span class="q-ml-md">ion-md-musical-note</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-musical-notes"></q-icon>
      <span class="q-ml-md">ion-md-musical-notes</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-navigate"></q-icon>
      <span class="q-ml-md">ion-md-navigate</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-notifications"></q-icon>
      <span class="q-ml-md">ion-md-notifications</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-notifications-off"></q-icon>
      <span class="q-ml-md">ion-md-notifications-off</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-notifications-outline"></q-icon>
      <span class="q-ml-md">ion-md-notifications-outline</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-nuclear"></q-icon>
      <span class="q-ml-md">ion-md-nuclear</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-nutrition"></q-icon>
      <span class="q-ml-md">ion-md-nutrition</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-open"></q-icon>
      <span class="q-ml-md">ion-md-open</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-options"></q-icon>
      <span class="q-ml-md">ion-md-options</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-outlet"></q-icon>
      <span class="q-ml-md">ion-md-outlet</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-paper"></q-icon>
      <span class="q-ml-md">ion-md-paper</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-paper-plane"></q-icon>
      <span class="q-ml-md">ion-md-paper-plane</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-partly-sunny"></q-icon>
      <span class="q-ml-md">ion-md-partly-sunny</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-pause"></q-icon>
      <span class="q-ml-md">ion-md-pause</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-paw"></q-icon>
      <span class="q-ml-md">ion-md-paw</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-people"></q-icon>
      <span class="q-ml-md">ion-md-people</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-person"></q-icon>
      <span class="q-ml-md">ion-md-person</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-person-add"></q-icon>
      <span class="q-ml-md">ion-md-person-add</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-phone-landscape"></q-icon>
      <span class="q-ml-md">ion-md-phone-landscape</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-phone-portrait"></q-icon>
      <span class="q-ml-md">ion-md-phone-portrait</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-photos"></q-icon>
      <span class="q-ml-md">ion-md-photos</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-pie"></q-icon>
      <span class="q-ml-md">ion-md-pie</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-pin"></q-icon>
      <span class="q-ml-md">ion-md-pin</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-pint"></q-icon>
      <span class="q-ml-md">ion-md-pint</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-pizza"></q-icon>
      <span class="q-ml-md">ion-md-pizza</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-planet"></q-icon>
      <span class="q-ml-md">ion-md-planet</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-play"></q-icon>
      <span class="q-ml-md">ion-md-play</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-play-circle"></q-icon>
      <span class="q-ml-md">ion-md-play-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-podium"></q-icon>
      <span class="q-ml-md">ion-md-podium</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-power"></q-icon>
      <span class="q-ml-md">ion-md-power</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-pricetag"></q-icon>
      <span class="q-ml-md">ion-md-pricetag</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-pricetags"></q-icon>
      <span class="q-ml-md">ion-md-pricetags</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-print"></q-icon>
      <span class="q-ml-md">ion-md-print</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-pulse"></q-icon>
      <span class="q-ml-md">ion-md-pulse</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-qr-scanner"></q-icon>
      <span class="q-ml-md">ion-md-qr-scanner</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-quote"></q-icon>
      <span class="q-ml-md">ion-md-quote</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-radio"></q-icon>
      <span class="q-ml-md">ion-md-radio</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-radio-button-off"></q-icon>
      <span class="q-ml-md">ion-md-radio-button-off</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-radio-button-on"></q-icon>
      <span class="q-ml-md">ion-md-radio-button-on</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-rainy"></q-icon>
      <span class="q-ml-md">ion-md-rainy</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-recording"></q-icon>
      <span class="q-ml-md">ion-md-recording</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-redo"></q-icon>
      <span class="q-ml-md">ion-md-redo</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-refresh"></q-icon>
      <span class="q-ml-md">ion-md-refresh</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-refresh-circle"></q-icon>
      <span class="q-ml-md">ion-md-refresh-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-remove"></q-icon>
      <span class="q-ml-md">ion-md-remove</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-remove-circle"></q-icon>
      <span class="q-ml-md">ion-md-remove-circle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-remove-circle-outline"></q-icon>
      <span class="q-ml-md">ion-md-remove-circle-outline</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-reorder"></q-icon>
      <span class="q-ml-md">ion-md-reorder</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-repeat"></q-icon>
      <span class="q-ml-md">ion-md-repeat</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-resize"></q-icon>
      <span class="q-ml-md">ion-md-resize</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-restaurant"></q-icon>
      <span class="q-ml-md">ion-md-restaurant</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-return-left"></q-icon>
      <span class="q-ml-md">ion-md-return-left</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-return-right"></q-icon>
      <span class="q-ml-md">ion-md-return-right</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-reverse-camera"></q-icon>
      <span class="q-ml-md">ion-md-reverse-camera</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-rewind"></q-icon>
      <span class="q-ml-md">ion-md-rewind</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-ribbon"></q-icon>
      <span class="q-ml-md">ion-md-ribbon</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-rocket"></q-icon>
      <span class="q-ml-md">ion-md-rocket</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-rose"></q-icon>
      <span class="q-ml-md">ion-md-rose</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-sad"></q-icon>
      <span class="q-ml-md">ion-md-sad</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-save"></q-icon>
      <span class="q-ml-md">ion-md-save</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-school"></q-icon>
      <span class="q-ml-md">ion-md-school</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-search"></q-icon>
      <span class="q-ml-md">ion-md-search</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-send"></q-icon>
      <span class="q-ml-md">ion-md-send</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-settings"></q-icon>
      <span class="q-ml-md">ion-md-settings</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-share"></q-icon>
      <span class="q-ml-md">ion-md-share</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-share-alt"></q-icon>
      <span class="q-ml-md">ion-md-share-alt</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-shirt"></q-icon>
      <span class="q-ml-md">ion-md-shirt</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-shuffle"></q-icon>
      <span class="q-ml-md">ion-md-shuffle</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-skip-backward"></q-icon>
      <span class="q-ml-md">ion-md-skip-backward</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-skip-forward"></q-icon>
      <span class="q-ml-md">ion-md-skip-forward</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-snow"></q-icon>
      <span class="q-ml-md">ion-md-snow</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-speedometer"></q-icon>
      <span class="q-ml-md">ion-md-speedometer</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-square"></q-icon>
      <span class="q-ml-md">ion-md-square</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-square-outline"></q-icon>
      <span class="q-ml-md">ion-md-square-outline</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-star"></q-icon>
      <span class="q-ml-md">ion-md-star</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-star-half"></q-icon>
      <span class="q-ml-md">ion-md-star-half</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-star-outline"></q-icon>
      <span class="q-ml-md">ion-md-star-outline</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-stats"></q-icon>
      <span class="q-ml-md">ion-md-stats</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-stopwatch"></q-icon>
      <span class="q-ml-md">ion-md-stopwatch</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-subway"></q-icon>
      <span class="q-ml-md">ion-md-subway</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-sunny"></q-icon>
      <span class="q-ml-md">ion-md-sunny</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-swap"></q-icon>
      <span class="q-ml-md">ion-md-swap</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-switch"></q-icon>
      <span class="q-ml-md">ion-md-switch</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-sync"></q-icon>
      <span class="q-ml-md">ion-md-sync</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-tablet-landscape"></q-icon>
      <span class="q-ml-md">ion-md-tablet-landscape</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-tablet-portrait"></q-icon>
      <span class="q-ml-md">ion-md-tablet-portrait</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-tennisball"></q-icon>
      <span class="q-ml-md">ion-md-tennisball</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-text"></q-icon>
      <span class="q-ml-md">ion-md-text</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-thermometer"></q-icon>
      <span class="q-ml-md">ion-md-thermometer</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-thumbs-down"></q-icon>
      <span class="q-ml-md">ion-md-thumbs-down</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-thumbs-up"></q-icon>
      <span class="q-ml-md">ion-md-thumbs-up</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-thunderstorm"></q-icon>
      <span class="q-ml-md">ion-md-thunderstorm</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-time"></q-icon>
      <span class="q-ml-md">ion-md-time</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-timer"></q-icon>
      <span class="q-ml-md">ion-md-timer</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-today"></q-icon>
      <span class="q-ml-md">ion-md-today</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-train"></q-icon>
      <span class="q-ml-md">ion-md-train</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-transgender"></q-icon>
      <span class="q-ml-md">ion-md-transgender</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-trash"></q-icon>
      <span class="q-ml-md">ion-md-trash</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-trending-down"></q-icon>
      <span class="q-ml-md">ion-md-trending-down</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-trending-up"></q-icon>
      <span class="q-ml-md">ion-md-trending-up</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-trophy"></q-icon>
      <span class="q-ml-md">ion-md-trophy</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-tv"></q-icon>
      <span class="q-ml-md">ion-md-tv</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-umbrella"></q-icon>
      <span class="q-ml-md">ion-md-umbrella</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-undo"></q-icon>
      <span class="q-ml-md">ion-md-undo</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-unlock"></q-icon>
      <span class="q-ml-md">ion-md-unlock</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-videocam"></q-icon>
      <span class="q-ml-md">ion-md-videocam</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-volume-high"></q-icon>
      <span class="q-ml-md">ion-md-volume-high</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-volume-low"></q-icon>
      <span class="q-ml-md">ion-md-volume-low</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-volume-mute"></q-icon>
      <span class="q-ml-md">ion-md-volume-mute</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-volume-off"></q-icon>
      <span class="q-ml-md">ion-md-volume-off</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-walk"></q-icon>
      <span class="q-ml-md">ion-md-walk</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-wallet"></q-icon>
      <span class="q-ml-md">ion-md-wallet</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-warning"></q-icon>
      <span class="q-ml-md">ion-md-warning</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-watch"></q-icon>
      <span class="q-ml-md">ion-md-watch</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-water"></q-icon>
      <span class="q-ml-md">ion-md-water</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-wifi"></q-icon>
      <span class="q-ml-md">ion-md-wifi</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-wine"></q-icon>
      <span class="q-ml-md">ion-md-wine</span>
    </div>
    <div class="q-ma-md">
      <q-icon size="30px" name="ion-md-woman"></q-icon>
      <span class="q-ml-md">ion-md-wine</span>
    </div>
  </q-page>
</template>

<script>
import KlabSpinner from 'components/KlabSpinner.vue';

export default {
  data() {
    return {
      animated: false,
      size: 100,
      color: null,
    };
  },
  components: {
    KlabSpinner,
  },
};
</script>

<style scoped>
  .q-ma-md {
    display: inline-block;
  }
  .q-ma-md .q-icon {
    text-align: right;
    vertical-align: middle;
  }
  .q-ma-md span {
    vertical-align: middle;
    margin-left: 10px;
  }
</style>
