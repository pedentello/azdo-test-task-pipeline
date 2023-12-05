const azdev = require('azure-devops-node-api');
const axios = require('axios');

const myToken = "XXX";
const myOrgUrl = 'https://pedentello.visualstudio.com';
const myProject = 'MyProject';
const myDefinition = 'MyProject'

async function run() {
    try {
        const authHandler = azdev.getPersonalAccessTokenHandler(myToken);
        const connectionApi = new azdev.WebApi(myOrgUrl, authHandler);
        const buildApi = await connectionApi.getBuildApi();

        //const definition = await buildApi.getDefinition(myProject,1);
        //console.log(definition);

        const build = await buildApi.getLatestBuild(myProject,myDefinition)
  
        const buildYaml = await buildApi.getBuildLogLines(myProject,build.id,1)

        if (buildYaml) {
            //console.log(buildYaml);
            const hasTask = buildYaml.toString().includes('FlutterInstall@0');
            //console.log(hasFlutterInstall);
            console.log(`FlutterInstall@0 task is ${hasTask ? 'present' : 'not present'} in the pipeline.`);
        } else {
            console.log("Erro");
        }


    }
    catch (err) {
        console.error(err);
    }
}

run();