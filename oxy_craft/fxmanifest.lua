fx_version 'cerulean'
games { 'gta5' }

ui_page "ui/index.html"


files {
    'ui/index.html',
    'ui/index.js',
    'ui/index.css',
    'ui/reset.css'
}


client_script { "@vrp/client/Tunnel.lua", "@vrp/client/Proxy.lua", 'client.lua' }
server_scripts {
    "@vrp/lib/utils.lua",
    'server.lua'
}
