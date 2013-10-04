var cluster = require('cluster');
var numberOfCpus = require('os').cpus().length;
    if (cluster.isMaster) 
    {
        //start up workers for each cpu
        for(i=0;i<numberOfCpus;i++)
        {
            cluster.fork();
            console.log("forked: " + i);
        }
        
        cluster.on('death', function(worker) {
            console.log('worker ' + worker.pid + ' died');
            cluster.fork();
        });

    }
    else
    {
        //load up your application as a worker
        require('./proxy_server/start_server');
        require('./proxy_server/test');
        require('./gui/app');
    }
    

//sysctl -a | grep somax
//kern.ipc.somaxconn: 128
//sudo sysctl -w kern.ipc.somaxconn=2048
// kern.maxfiles: 12288
//kern.maxfilesperproc: 10240
//net.inet.ip.portrange.first: 49152
//net.inet.ip.portrange.hifirst: 49152