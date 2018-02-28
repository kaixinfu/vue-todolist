import Vue from 'vue';
import APP from './app.vue';

import './assets/styles/test.css'
import './assets/imgs/backgroud.jpg'
import './assets/styles/test.stylus.styl'

const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
    render: (h) => h(APP)
}).$mount(root)