const path=require('path');

module.exports={
    mode:'development', //when you deploy can change it to production
    watch:true, //look for any code changes and compile them automatically
    devtool:"source-map", //will enable source maps for browser debuging
    entry:{ app:"./app/app.tsx"}, // entry point to the application
    output:{
        path:path.join(__dirname,"./dist"), //compiled js code folder
        filename:"[name].js" //bundle name
    },
    resolve:{
        extensions:[".js",".json",".jsx",".tsx"] //compatible file extensions list
    },
    module:{
        rules:[ //rules for ts-loader
            {
                test:/\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                      loader: 'ts-loader',
                    },
                  ]
            }
        ]
    }
}

        