local Proxy = module("vrp", "lib/Proxy")
local Tunnel = module("vrp", "lib/Tunnel")
nS = {}
vRP = Proxy.getInterface("vRP")
vRPclient = Tunnel.getInterface("vRP", "oxy_inceput")
nC = Tunnel.getInterface("oxy_inceput", "oxy_inceput")
Tunnel.bindInterface("oxy_inceput", nS)
Proxy.addInterface("oxy_inceput", nS)

ServerCallbacks = {}

RegisterServerEvent(GetCurrentResourceName() .. ':triggerServerCallback')
AddEventHandler(GetCurrentResourceName() .. ':triggerServerCallback', function(name, requestId, ...)
    local playerId = source

    TriggerServerCallback(name, requestId, playerId, function(...)
        TriggerClientEvent(GetCurrentResourceName() .. ':serverCallback', playerId, requestId, ...)
    end, ...)
end)

function RegisterServerCallback(name, cb)
    ServerCallbacks[name] = cb
end

function TriggerServerCallback(name, requestId, source, cb, ...)
    if ServerCallbacks[name] then
        ServerCallbacks[name](source, cb, ...)
    end
end

iteme = { "barafata", "baraspate", "roata" }


RegisterServerEvent("trybuystuff")
AddEventHandler("trybuystuff", function(data)
    poateluia = true
    for index, value in pairs(data.iteme) do
        if vRP.tryGetInventoryItem({ vRP.getUserId({ source }), value.itemid, value.cate, true }) == false then
            print(value.itemid)
            poateluia = false
        end
    end
    if (poateluia) then
        vRP.giveInventoryItem({vRP.getUserId({ source }), data.numemasina,1,true})
    end
end)



RegisterServerEvent("trygetcomponenta")
AddEventHandler("trygetcomponenta", function()
    id = vRP.getUserId({ source })

    questit1 = math.random(#iteme)
    questit = iteme[questit1]
    print(questit)
    vRP.giveInventoryItem({ id, questit, 1, true })
end)


RegisterServerCallback('getinventory', function(source, cb)
    local invData = vRP.getUserDataTable { vRP.getUserId({ source }) }.inventory
    print(json.encode(invData))
    cb(invData)
end)
