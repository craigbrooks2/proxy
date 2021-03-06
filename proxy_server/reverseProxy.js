var cluster = require('cluster');
var posix = require('posix');
posix.setrlimit('nofile', { soft: 10200 });
var numberOfCpus = require('os').cpus().length;
    if (cluster.isMaster) 
    {
        //start up workers for each cpu
        for(i=0;i<numberOfCpus-1;i++)
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
        require('./start_server');
    }
    

//sysctl -a | grep somax
//kern.ipc.somaxconn: 128
//sudo sysctl -w kern.ipc.somaxconn=2048
// kern.maxfiles: 12288
//kern.maxfilesperproc: 10240
//net.inet.ip.portrange.first: 49152
//net.inet.ip.portrange.hifirst: 49152