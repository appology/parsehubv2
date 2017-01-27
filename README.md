# parsehubv2

This is an unofficial NodeJS library for [ParseHub](https://www.parsehub.com/), a platform that allows you turn dynamic websites into APIs.

## Install

```
npm install --save parsehubv2
```

## Usage

Require the module and start an instance by using your ParseHub API key.

```
var ParseHub = require('parsehubv2');
var phub = new ParseHub('YOUR API KEY');
```

## Examples

```
phub.getProject({ project_token: 'YOUR PROJECT TOKEN' }, function (err, phProject) {
    console.log(phProject);
});
```

```
phub.getLastReadyData({ project_token: 'YOUR PROJECT TOKEN' }, function (err, phLastReadyData) {
    console.log(phLastReadyData);
});
```
