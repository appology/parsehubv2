![ParseHub icon](https://www.parsehub.com/static/images/parsehub_logo2.svg)

# ParseHub v2

This is an unofficial NodeJS library for [ParseHub](https://www.parsehub.com/), a platform that allows you turn dynamic websites into APIs.


## Install it

```
npm install --save parsehubv2
```


## Fire it up

Require the module and fire it up with your ParseHub API key.

```
var ParseHub = require('parsehubv2');
var phub = new ParseHub('YOUR API KEY');
```


## Use it

Get a list of your projects.

```
phub.getProjectList(function (err, phProjectList) {
	console.log(phProjectList);
});
```


Get a project.

```
phub.getProject({ project_token: 'YOUR PROJECT TOKEN' }, function (err, phProject) {
	console.log(phProject);
});
```


Run a project. Returns information about the started run if successful 

```
phub.runProject({ project_token: 'YOUR PROJECT TOKEN' }, function (err, phProjectRun) {
	console.log(phProjectRun);
});
```


Get a project run.

```
phub.getRun({ run_token: 'YOUR RUN TOKEN' }, function (err, phRun) {
	console.log(phRun);
});
```


Cancel a project run. Returns the cancelled run token if successful. 

```
phub.cancelRun({ run_token: 'YOUR RUN TOKEN' }, function (err, phCancelledRun) {
	console.log(phCancelledRun);
});
```


Delete a project run. Returns the deleted run token if successful.

```
phub.deleteRun({ run_token: 'YOUR RUN TOKEN' }, function (err, phDeletedRun) {
	console.log(phDeletedsRun);
});
```


Get project run data.

```
phub.getRunData({ run_token: 'YOUR RUN TOKEN' }, function (err, phRunData) {
	console.log(phRunData);
});
```


Get last ready project data.
```
phub.getLastReadyData({ project_token: 'YOUR PROJECT TOKEN' }, function (err, phLastReadyData) {
	console.log(phLastReadyData);
});
```