data = {}
ServerCallbacks = {}
CurrentRequestId = 0
function TriggerServerCallback(c, d, ...)
    ServerCallbacks[CurrentRequestId] = d
    TriggerServerEvent(GetCurrentResourceName() .. ":triggerServerCallback", c, CurrentRequestId, ...)
    if CurrentRequestId < 65535 then
        CurrentRequestId = CurrentRequestId + 1
    else
        CurrentRequestId = 0
    end
end

RegisterNetEvent(GetCurrentResourceName() .. ":serverCallback")
AddEventHandler(GetCurrentResourceName() .. ":serverCallback", function(e, ...)
    ServerCallbacks[e](...)
    ServerCallbacks[e] = nil
end)

bo = false
RegisterCommand("nuitest", function(player)
    bo = not bo
    SetDisplay(bo)
end, false)

cat222 = 1
function SetDisplay(bool)
    display = bool
    SetNuiFocus(bool, bool)
    TriggerServerCallback("getinventory", function(d)
        SendNUIMessage({
            type = "ui",
            status = bool,
            inv = d,
            craft = data,
            nmr = cat222,
        })
    end)
end

RegisterNUICallback("getinventory", function(data)


end)

cautacomponente = false

RegisterNetEvent("compauto")
AddEventHandler("compauto", function()
    cautacomponente = not cautacomponente
end)

RegisterNetEvent("opencrafting")
AddEventHandler("opencrafting", function()
    SetDisplay(true)
end)


RegisterNUICallback("exit", function(data)
    TriggerEvent("iesi")
    SetDisplay(false)
end)
RegisterNUICallback("craft", function(data)
    TriggerServerEvent("trybuystuff", data)
end)






data = {
    [1] = { 5148.4560546875,-5124.0571289063,2.4077813625336 },
    [2] = { 2439.0166015625,4975.9658203125,46.810577392578 }
}





Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1)
        for index, value in ipairs(data) do
            local pos = GetEntityCoords(GetPlayerPed(-1), true)
            if Vdist(pos.x, pos.y, pos.z, value[1], value[2], value[3]) < 2.5 then
                DrawText3D(value[1], value[2], value[3] + 0.53, "~w~Apasa ~y~E~w~ pentru a crafta!",
                    0.8)
                if IsControlJustReleased(0, 38) then
                    cat222 = index
                    Wait(50)
                    SetDisplay(true)
                    Wait(50)
                end
            end
        end
    end
end)

















--quest





local jobs = {
    locatii = {
        [1] = { 755.00189208984, 1299.7836914063, 360.29678344727 },
        [2] = { 866.69659423828, 2876.7551269531, 56.94412612915 },
        [3] = { -680.63122558594, 5802.0126953125, 17.330949783325 },
        [4] = { -176.29754638672, 6148.9921875, 42.637466430664 },
        [5] = { 2440.0920410156, 4973.5380859375, 51.706695556641 },
        [6] = { 2486.7983398438, 3718.8056640625, 43.466075897217 },
        [7] = { -1202.5089111328, -1792.0528564453, 3.9084670543671 },
        [8] = { -1562.5087890625, -3235.1237792969, 26.33617401123 },
        [9] = { -680.63122558594, 5802.0126953125, 17.330949783325 },
        [10] = { 34.299583435059, -623.56372070313, 31.628639221191 },
        [11] = { -83.00106048584, -699.27197265625, 49.475040435791 },
        [12] = { -112.80073547363, -432.26794433594, 35.918357849121 },
        [13] = { -586.96411132813, -281.75848388672, 50.324035644531 },
        [14] = { -320.02630615234, -68.855697631836, 54.423099517822 },
        [15] = { -388.10873413086, 294.38317871094, 84.891372680664 },
        [16] = { 454.72015380859, 253.18721008301, 103.05278778076 },
        [17] = { 1267.8148193359, 1901.6516113281, 79.387840270996 },
        [18] = { 933.49322509766, 2447.0913085938, 50.263969421387 },
        [19] = { 235.17950439453, 3110.0891113281, 42.406089782715 },
        [20] = { -412.65264892578, 2964.1586914063, 24.977388381958 },
        [21] = { 2354.0634765625, 3133.3666992188, 48.208690643311 },
        [22] = { 2627.1962890625, 3269.2941894531, 55.225574493408 },
        [23] = { 2712.1909179688, 4147.4575195313, 43.901180267334 },
        [24] = { 2761.9860839844, 3469.8996582031, 55.645603179932 },
        [25] = { 2542.0634765625, 2587.1042480469, 37.983390808105 },
        [26] = { 2699.9533691406, 1565.5123291016, 24.538202285767 },
        [27] = { 2575.5971679688, 312.62228393555, 108.45752716064 },
        [28] = { 2562.8295898438, -420.17724609375, 92.992401123047 },
        [28] = { 1733.0732421875, -1583.0329589844, 112.58430480957 },
        [28] = { 1636.9000244141, -2346.3518066406, 95.319221496582 },

    }
}

function timpPayday1(x, y, width, height, scale, text, r, g, b, a, outline)
    SetTextFont(4)
    SetTextProportional(1)
    SetTextScale(scale, scale)
    SetTextColour(0, 0, 0, 255)
    SetTextDropShadow(0, 0, 0, 0, 255)
    SetTextEdge(1, 0, 0, 0, 255)
    SetTextDropShadow()
    --SetTextOutline()
    SetTextEntry("STRING")
    AddTextComponentString(text)
    DrawText(x, y)
end

function DrawText3D(x, y, z, text, scl)

    local onScreen, _x, _y = World3dToScreen2d(x, y, z)
    local px, py, pz = table.unpack(GetGameplayCamCoords())
    local dist = GetDistanceBetweenCoords(px, py, pz, x, y, z, 1)

    local scale = (1 / dist) * scl
    local fov = (1 / GetGameplayCamFov()) * 100
    local scale = scale * fov

    if onScreen then
        SetTextScale(0.0 * scale, 1.1 * scale)
        SetTextFont(0)
        SetTextProportional(1)
        -- SetTextScale(0.0, 0.55)
        SetTextColour(255, 255, 255, 255)
        SetTextDropshadow(0, 0, 0, 0, 255)
        SetTextEdge(2, 0, 0, 0, 150)
        SetTextDropShadow()
        SetTextOutline()
        SetTextEntry("STRING")
        SetTextCentre(1)
        AddTextComponentString(text)
        DrawText(_x, _y)
    end
end

learefacute = true
questit1 = math.random(#jobs.locatii)
questit = jobs.locatii[questit1]
function tprint(tbl, indent)
    if not indent then indent = 0 end
    for k, v in pairs(tbl) do
        formatting = string.rep("  ", indent) .. k .. ": "
        if type(v) == "table" then
            print(formatting)
            tprint(v, indent + 1)
        else
            print(formatting .. v)
        end
    end
end

tprint(questit)
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1)
        if learefacute == false then
            local pos = GetEntityCoords(GetPlayerPed(-1), true)
            timpPayday1(0.4, 0.96, 1.0, 1.0, 0.35,
                "~b~Distanta pana la urmatoarea componenta auto :" ..
                Vdist(pos.x, pos.y, pos.z, questit[1], questit[2], questit[3]) .. " metri!", 255, 255, 255, 255)
            if Vdist(pos.x, pos.y, pos.z, questit[1], questit[2], questit[3]) < 35.5 then
                DrawText3D(questit[1], questit[2], questit[3] + 0.23, "~y~🎁 ", 1.5)
            end
            if Vdist(pos.x, pos.y, pos.z, questit[1], questit[2], questit[3]) < 1.5 then
                DrawText3D(questit[1], questit[2], questit[3] + 0.53, "~w~Apasa ~y~E~w~ pentru a colecta componenta!",
                    1.5)
                if IsControlJustReleased(0, 38) then
                    questit1 = math.random(#jobs.locatii)
                    questit = jobs.locatii[questit1]
                    ExecuteCommand("e lapdance2")
                    ExecuteCommand("e fishdance")
                    Wait(1500)
                    ExecuteCommand("e c")
                    TriggerServerEvent("trygetcomponenta")

                end
            end
        else
            Wait(5000)
        end
    end
end)


RegisterNetEvent("oprestepornestequst")
AddEventHandler('oprestepornestequst', function()
    learefacute = not learefacute
end)
