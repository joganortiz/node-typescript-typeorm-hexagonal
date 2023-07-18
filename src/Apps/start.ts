import { MoocBackendApp } from '@Apps/BackendApp';

try {
    // start project
    new MoocBackendApp().start();
} catch (error) {
    console.log(error);
}
