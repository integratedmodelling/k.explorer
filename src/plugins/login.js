import Vue from 'vue';
import authentication from './authentication';
import { WEB_CONSTANTS, KEYCLOAK } from '../shared/Constants';


export default () => {
    const urlParams = new URLSearchParams(window.location.search);

    console.log(urlParams);
    const remoteDebug = urlParams.get(WEB_CONSTANTS.PARAMS_DEBUG_REMOTE);
    console.log('hola');
    console.log(remoteDebug);


    Vue.config.productionTip = false;
    Vue.use(authentication);


    Vue.$keycloak
        .init({ onLoad: 'login-required', checkLoginIframe: false, silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html` })
        .then((auth) => {
            if (!auth) {
                window.location.reload();
            } else {
                localStorage.setItem(KEYCLOAK.TOKEN, Vue.$keycloak.token);
                localStorage.setItem(KEYCLOAK.REFRESH_TOKEN, Vue.$keycloak.refreshToken);
                console.debug(Vue.prototype.$axios.defaults.headers);
                Vue.prototype.$axios.defaults.headers.common.Authorization = KEYCLOAK.BEARER + Vue.$keycloak.token;

                console.debug('Authenticated');
            }

            setInterval(() => {
                Vue.$keycloak.updateToken().then((refreshed) => {
                    // if (store.getters['auth/isLoggedIn'] !== false) {
                    if (refreshed) {
                        console.debug(`Token refreshed ${refreshed}`);
                        localStorage.setItem(KEYCLOAK.TOKEN, Vue.$keycloak.token);
                        localStorage.setItem(KEYCLOAK.REFRESH_TOKEN, Vue.$keycloak.refreshToken);
                        Vue.prototype.$axios.defaults.headers.common.Authorization = KEYCLOAK.BEARER + Vue.$keycloak.token;
                    } else {
                        console.debug(`Token not refreshed, valid for ${Math.round(Vue.$keycloak.tokenParsed.exp + Vue.$keycloak.timeSkew - new Date().getTime() / 1000)} seconds`);
                    }
                    // }
                    // else {
                    //   // If the user is reading the agreement not logout
                    //   if (!store.getters['keycloak/signing_agreement']) {
                    //     // __ENV__.APP_BASE_URL
                    //     const logoutOptions = { redirectUri: 'http://localhost:8080/modeler' };

                    //     Vue.$keycloak.logout(logoutOptions)
                    //       .catch((error) => {
                    //         console.error(error);
                    //       });
                    //     store.commit('LOGOUT');
                    //   }
                    // }
                }).catch(() => {
                    console.error('Failed to refresh token');
                });
            }, 60000);
        }).catch((error) => {
            console.error(error);
            console.debug('Authenticated Failed');
        });
};
