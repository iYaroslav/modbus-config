# Modbus

#### Logging in to npm registry
```bash
npm config set always-auth true
npm config set @iq:registry https://npm.leerybit.uz/
npm login --registry=https://npm.leerybit.uz/
```
[More info](https://docs.npmjs.com/logging-in-to-an-npm-enterprise-registry-from-the-command-line)

#### For build app on *nix:
```bash
sudo apt install build-essential \
    libudev-dev \
    libopenjp2-tools \
    libusb-1.0-0-dev \
    g++-multilib \
    libudev-dev:i386
```
[More info](https://www.npmjs.com/package/usb)

#### On Windows:
```bash
npm install -g node-gyp
npm install --global --production windows-build-tools
```
[More info](https://github.com/nodejs/node-gyp#installation)

#### For build app on *nix
```bash
sudo usermod -a -G dialout $USER
```

#### Build
```bash
yarn build:$PLATFORM
```
