inventory = {};
poticrafta = false
mesaj = ""
idmasinacurenta = 0
cat = 1

$(document).ready(function() {

    window.addEventListener("message", function(event) {


        $(".masini").html("<span class='symbol'></span>" + event.data.masini);
        $(".pret").html("<span class='symbol'>Vinde pentru</span>" + event.data.pret);
        $(".numemasina").html("<span class='symbol'>Nume masina: </span>" + event.data.numemasina);
        $(".pretoriginal").html("<span class='symbol'>Pret Original  </span> " + event.data.pretoriginal);


    });
});

$(function() {
    function display(bool, cat1) {
        if (bool) {
            lastdata = data
            cat = cat1
            toshowdata = ""
            data = data[cat]
            for (var k in data) {
                console.log(data[k].link)
                datatossss = data[k].numemasina.replace('wbody|WEAPON_', '')
                datatossss = datatossss.replace('wammo|WEAPON_', ' Ammo ')
                datatossss = datatossss.replace('_', ' ')
                toshowdata = toshowdata + `
<button onclick="alegemasina('${k}')" class="button">
<div id="altcv">${datatossss}</div>
        <img   id="imaginea" src='${data[k].link}'>
        
    `
            }
            document.getElementById("container").innerHTML = toshowdata
            $("#container").show();
            $("#tabeludejos").show();
            $("#buttoncumparare").show();
            $("#cvromroleplay").show();
        } else {
            data = lastdata
            $("#container").hide();
            $("#tabeludejos").hide();
            $("#buttoncumparare").hide();
            $("#cvromroleplay").hide();
            document.getElementById("buttoncumparare").innerHTML = "Alege Ce Doresti Sa Craftezi."
            document.getElementById("tabeludejos").innerHTML = ""
        }
    }

    display(false, 1)

    window.addEventListener('message', function(event) {
            var item = event.data;
            inventory = item.inv

            if (item.type === "ui") {
                if (item.status == true) {
                    display(true, item.nmr)
                } else {
                    display(false, 1)
                }
            }
            console.log(inventory)
        })
        // if the person uses the escape key, it will exit the resource

    document.onkeyup = function(data) {
        if (data.which == 27) {
            $.post('https://oxy_craft/exit', JSON.stringify({}));
            return
        }
    };


















    $("#close").click(function() {
        $.post('https://oxy_craft/exit', JSON.stringify({}));
        return
    })
})

function crafteaza() {
    if (are) {
        $.post('https://oxy_craft/craft', JSON.stringify(data[idmasinacurenta]));

    }

}

function alegemasina(idmasina) {

    idmasinacurenta = idmasina
    console.log(idmasina)
        //data = {}
        //data.masina = idmasina

    //$.post('https://oxy_craft/setmasina', JSON.stringify({}));
    needed = `<div  class="card-group"">`
    cat = 0
    nuai = ""

    for (var k in data[idmasina].iteme) {
        too = 0
        cat = cat + 1
        are = true
        if (inventory[data[idmasina].iteme[k].itemid] != null) {
            console.log(inventory[data[idmasina].iteme[k].itemid]["amount"])
            too = inventory[data[idmasina].iteme[k].itemid]["amount"]
            if ((too >= data[idmasina].iteme[k].cate) == false) {
                are = false
            }
        } else {
            are = false
        }
        needed = needed + `
            <div class="col">
                <div style=" font-weight: 400;font-size: 90%;text-decoration: none;height:35%; color: black; text-align: center; background-color: rgb(255, 236, 28); transform: skewY(-4deg);margin-top: 30px; box-shadow: 10.58px 14.562px 21px 0px rgba(255, 234, 4, 0.22), 51.137px 70.384px 60px 0px rgb(255 236 28 / 22%);" class="card">
                    ${data[idmasina].iteme[k].nume}
                    <br>
                    ${too}/${data[idmasina].iteme[k].cate}
                    <div class="card-body">
                    </div>
                </div>
            </div>
        `
        if (cat == 4) {
            needed = needed + " </div>"
            needed = needed + `<div class="card-group"">`
            cat = 0
        }
    }

    needed = needed + " </div>"
    document.getElementById("tabeludejos").innerHTML = needed
    poticrafta = are
    if (are == false) {
        document.getElementById("buttoncumparare").innerHTML = "Lipsa Materiale!"
        document.getElementById("buttoncumparare").style.backgroundColor = "#D0342c";
        document.getElementById("buttoncumparare").style.boxShadow = "10.58px 14.562px 21px 0px rgba(255, 4, 4, 0.251), 51.137px 70.384px 60px 0px rgba(255, 28, 28, 0.22)";
        
    } else {
        document.getElementById("buttoncumparare").innerHTML = "Crafteaza Item."
        document.getElementById("buttoncumparare").style.boxShadow = "10.58px 14.562px 21px 0px rgba(35, 221, 10, 0.251), 51.137px 70.384px 60px 0px rgba(5, 242, 9, 0.22);";
    }
    return
}

data = {
    [1]: {
        [1]: {
            numemasina: "wbody|WEAPON_PISTOL",
            link: "https://media.discordapp.net/attachments/991091747662749709/991864930166919228/pistol-removebg-preview.png",
            iteme: {
                [1]: { cate: 15, nume: "Cupru", itemid: "cupru" },
                [2]: { cate: 30, nume: "Argint", itemid: "argint" },
                [3]: { cate: 45, nume: "Fier", itemid: "fier" }
            }
        },
        [2]: {
            numemasina: "wbody|WEAPON_NAVYREVOLVER",
            link: "https://media.discordapp.net/attachments/991091747662749709/991864895794577488/navy-removebg-preview.png",
            iteme: {
                [1]: { cate: 24, nume: "Cupru", itemid: "cupru" },
                [2]: { cate: 26, nume: "Argint", itemid: "argint" },
                [3]: { cate: 37, nume: "Platina", itemid: "platina" },
                [4]: { cate: 56, nume: "Fier", itemid: "fier" }
            }
        },
        [3]: {
            numemasina: "wbody|WEAPON_DOUBLEACTION",
            link: "https://media.discordapp.net/attachments/991091747662749709/991864896348246026/doubleaction-removebg-preview.png",
            iteme: {
                [1]: { cate: 14, nume: "Cupru", itemid: "cupru" },
                [2]: { cate: 16, nume: "Argint", itemid: "argint" },
                [3]: { cate: 27, nume: "Platina", itemid: "platina" },
                [4]: { cate: 46, nume: "Fier", itemid: "fier" }
            }
        },
        [4]: {
            numemasina: "wbody|WEAPON_COMBATPISTOL",
            link: "https://media.discordapp.net/attachments/991091747662749709/991864929948807188/combat_pistol-removebg-preview.png",
            iteme: {
                [1]: { cate: 18, nume: "Cupru", itemid: "cupru" },
                [2]: { cate: 36, nume: "Argint", itemid: "argint" },
                [3]: { cate: 45, nume: "Fier", itemid: "fier" }
            }
        },
        [5]: {
            numemasina: "wbody|WEAPON_MICROSMG",
            link: "https://media.discordapp.net/attachments/991091747662749709/991864914555719760/microsmg-removebg-preview.png",
            iteme: {
                [1]: { cate: 22, nume: "Cupru", itemid: "cupru" },
                [1]: { cate: 19, nume: "Argint", itemid: "argint" },
                [2]: { cate: 35, nume: "Fier", itemid: "fier" }
            }
        },
        [6]: {
            numemasina: "wbody|WEAPON_SMG",
            link: "https://media.discordapp.net/attachments/991091747662749709/991864914807357490/smg-removebg-preview.png",
            iteme: {
                [1]: { cate: 22, nume: "Cupru", itemid: "cupru" },
                [2]: { cate: 23, nume: "Argint", itemid: "argint" },
                [3]: { cate: 42, nume: "Fier", itemid: "fier" }
            }
        },
        [7]: {
            numemasina: "wbody|WEAPON_PUMPSHOTGUN",
            link: "https://media.discordapp.net/attachments/991091747662749709/991864915000307712/pumpshotgun-removebg-preview.png",
            iteme: {
                [1]: { cate: 24, nume: "Cupru", itemid: "cupru" },
                [2]: { cate: 26, nume: "Argint", itemid: "argint" },
                [3]: { cate: 37, nume: "Platina", itemid: "platina" },
                [4]: { cate: 56, nume: "Fier", itemid: "fier" }
            }
        },
        [8]: {
            numemasina: "wbody|WEAPON_ASSAULTRIFLE",
            link: "https://media.discordapp.net/attachments/991091747662749709/991864875364122634/AK-47_assault_rifle-removebg-preview.png",
            iteme: {
                [1]: { cate: 34, nume: "Cupru", itemid: "cupru" },
                [2]: { cate: 27, nume: "Argint", itemid: "argint" },
                [3]: { cate: 37, nume: "Platina", itemid: "platina" },
                [4]: { cate: 56, nume: "Fier", itemid: "fier" }
            }
        },
        [9]: {
            numemasina: "wbody|WEAPON_CARBINERIFLE",
            link: "https://media.discordapp.net/attachments/991091747662749709/991864876060397628/carabina-removebg-preview.png",
            iteme: {
                [1]: { cate: 34, nume: "Cupru", itemid: "cupru" },
                [2]: { cate: 27, nume: "Argint", itemid: "argint" },
                [3]: { cate: 37, nume: "Platina", itemid: "platina" },
                [4]: { cate: 56, nume: "Fier", itemid: "fier" }
            }
        },
        [10]: {
            numemasina: "wbody|WEAPON_MG",
            link: "https://media.discordapp.net/attachments/991091747662749709/991864896000106536/mg-removebg-preview.png",
            iteme: {
                [1]: { cate: 45, nume: "Cupru", itemid: "cupru" },
                [2]: { cate: 35, nume: "Argint", itemid: "argint" },
                [3]: { cate: 37, nume: "Platina", itemid: "platina" },
                [4]: { cate: 67, nume: "Fier", itemid: "fier" }
            }
        },
        [11]: {
            numemasina: "wbody|WEAPON_SNIPERRIFLE",
            link: "https://media.discordapp.net/attachments/991091747662749709/991864875741614240/sniper.gif",
            iteme: {
                [1]: { cate: 57, nume: "Cupru", itemid: "cupru" },
                [2]: { cate: 45, nume: "Argint", itemid: "argint" },
                [3]: { cate: 57, nume: "Platina", itemid: "platina" },
                [4]: { cate: 77, nume: "Fier", itemid: "fier" }
            }
        },
        [12]: {
            numemasina: "wammo|WEAPON_SNIPERRIFLE",
            link: "https://th.bing.com/th/id/R.51a5fb0876a99d5497a55540e06ac4a1?rik=azBqQEIO44O6BA&riu=http%3a%2f%2fwww.midsouthshooterssupply.com%2fimages%2fcategory-headers%2fammunition.jpg&ehk=5ZMwGMqiwOuG2WIN7Cjd2p%2b3TFAw1rLGyNL23nwPXTE%3d&risl=&pid=ImgRaw&r=0",
            iteme: {
                [1]: { cate: 46, nume: "Praf de Pusca", itemid: "praf" },
                [2]: { cate: 57, nume: "Fier", itemid: "fier" }
            }
        },
        [13]: {
            numemasina: "wammo|WEAPON_MG",
            link: "https://th.bing.com/th/id/R.51a5fb0876a99d5497a55540e06ac4a1?rik=azBqQEIO44O6BA&riu=http%3a%2f%2fwww.midsouthshooterssupply.com%2fimages%2fcategory-headers%2fammunition.jpg&ehk=5ZMwGMqiwOuG2WIN7Cjd2p%2b3TFAw1rLGyNL23nwPXTE%3d&risl=&pid=ImgRaw&r=0",
            iteme: {
                [1]: { cate: 37, nume: "Praf de Pusca", itemid: "praf" },
                [2]: { cate: 39, nume: "Fier", itemid: "fier" }
            }
        },
        [14]: {
            numemasina: "wammo|WEAPON_CARBINERIFLE",
            link: "https://th.bing.com/th/id/R.51a5fb0876a99d5497a55540e06ac4a1?rik=azBqQEIO44O6BA&riu=http%3a%2f%2fwww.midsouthshooterssupply.com%2fimages%2fcategory-headers%2fammunition.jpg&ehk=5ZMwGMqiwOuG2WIN7Cjd2p%2b3TFAw1rLGyNL23nwPXTE%3d&risl=&pid=ImgRaw&r=0",
            iteme: {
                [1]: { cate: 32, nume: "Praf de Pusca", itemid: "praf" },
                [2]: { cate: 36, nume: "Fier", itemid: "fier" }
            }
        },
        [15]: {
            numemasina: "wammo|WEAPON_PUMPSHOTGUNE",
            link: "https://th.bing.com/th/id/R.51a5fb0876a99d5497a55540e06ac4a1?rik=azBqQEIO44O6BA&riu=http%3a%2f%2fwww.midsouthshooterssupply.com%2fimages%2fcategory-headers%2fammunition.jpg&ehk=5ZMwGMqiwOuG2WIN7Cjd2p%2b3TFAw1rLGyNL23nwPXTE%3d&risl=&pid=ImgRaw&r=0",
            iteme: {
                [1]: { cate: 35, nume: "Praf de Pusca", itemid: "praf" },
                [2]: { cate: 45, nume: "Fier", itemid: "fier" }
            }
        },
        [16]: {
            numemasina: "wammo|WEAPON_SMG",
            link: "https://th.bing.com/th/id/R.51a5fb0876a99d5497a55540e06ac4a1?rik=azBqQEIO44O6BA&riu=http%3a%2f%2fwww.midsouthshooterssupply.com%2fimages%2fcategory-headers%2fammunition.jpg&ehk=5ZMwGMqiwOuG2WIN7Cjd2p%2b3TFAw1rLGyNL23nwPXTE%3d&risl=&pid=ImgRaw&r=0",
            iteme: {
                [1]: { cate: 22, nume: "Praf de Pusca", itemid: "praf" },
                [2]: { cate: 31, nume: "Fier", itemid: "fier" }
            }
        },
        [17]: {
            numemasina: "wammo|WEAPON_MICROSMG",
            link: "https://th.bing.com/th/id/R.51a5fb0876a99d5497a55540e06ac4a1?rik=azBqQEIO44O6BA&riu=http%3a%2f%2fwww.midsouthshooterssupply.com%2fimages%2fcategory-headers%2fammunition.jpg&ehk=5ZMwGMqiwOuG2WIN7Cjd2p%2b3TFAw1rLGyNL23nwPXTE%3d&risl=&pid=ImgRaw&r=0",
            iteme: {
                [1]: { cate: 25, nume: "Praf de Pusca", itemid: "praf" },
                [2]: { cate: 34, nume: "Fier", itemid: "fier" }
            }
        },
        [18]: {
            numemasina: "wammo|WEAPON_COMBATPISTOL",
            link: "https://th.bing.com/th/id/R.51a5fb0876a99d5497a55540e06ac4a1?rik=azBqQEIO44O6BA&riu=http%3a%2f%2fwww.midsouthshooterssupply.com%2fimages%2fcategory-headers%2fammunition.jpg&ehk=5ZMwGMqiwOuG2WIN7Cjd2p%2b3TFAw1rLGyNL23nwPXTE%3d&risl=&pid=ImgRaw&r=0",
            iteme: {
                [1]: { cate: 19, nume: "Praf de Pusca", itemid: "praf" },
                [2]: { cate: 21, nume: "Fier", itemid: "fier" }
            }
        },
        [19]: {
            numemasina: "wammo|WEAPON_DOUBLEACTION",
            link: "https://th.bing.com/th/id/R.51a5fb0876a99d5497a55540e06ac4a1?rik=azBqQEIO44O6BA&riu=http%3a%2f%2fwww.midsouthshooterssupply.com%2fimages%2fcategory-headers%2fammunition.jpg&ehk=5ZMwGMqiwOuG2WIN7Cjd2p%2b3TFAw1rLGyNL23nwPXTE%3d&risl=&pid=ImgRaw&r=0",
            iteme: {
                [1]: { cate: 26, nume: "Praf de Pusca", itemid: "praf" },
                [2]: { cate: 31, nume: "Fier", itemid: "fier" }
            }
        },
        [20]: {
            numemasina: "wammo|WEAPON_NAVYREVOLVER",
            link: "https://th.bing.com/th/id/R.51a5fb0876a99d5497a55540e06ac4a1?rik=azBqQEIO44O6BA&riu=http%3a%2f%2fwww.midsouthshooterssupply.com%2fimages%2fcategory-headers%2fammunition.jpg&ehk=5ZMwGMqiwOuG2WIN7Cjd2p%2b3TFAw1rLGyNL23nwPXTE%3d&risl=&pid=ImgRaw&r=0",
            iteme: {
                [1]: { cate: 25, nume: "Praf de Pusca", itemid: "praf" },
                [2]: { cate: 33, nume: "Fier", itemid: "fier" }
            }
        },
        [21]: {
            numemasina: "wammo|WEAPON_PISTOL",
            link: "https://th.bing.com/th/id/R.51a5fb0876a99d5497a55540e06ac4a1?rik=azBqQEIO44O6BA&riu=http%3a%2f%2fwww.midsouthshooterssupply.com%2fimages%2fcategory-headers%2fammunition.jpg&ehk=5ZMwGMqiwOuG2WIN7Cjd2p%2b3TFAw1rLGyNL23nwPXTE%3d&risl=&pid=ImgRaw&r=0",
            iteme: {
                [1]: { cate: 12, nume: "Praf de Pusca", itemid: "praf" },
                [2]: { cate: 21, nume: "Fier", itemid: "fier" }
            }
        },
        [22]: {
            numemasina: "wammo|WEAPON_PISTOL50",
            link: "https://th.bing.com/th/id/R.51a5fb0876a99d5497a55540e06ac4a1?rik=azBqQEIO44O6BA&riu=http%3a%2f%2fwww.midsouthshooterssupply.com%2fimages%2fcategory-headers%2fammunition.jpg&ehk=5ZMwGMqiwOuG2WIN7Cjd2p%2b3TFAw1rLGyNL23nwPXTE%3d&risl=&pid=ImgRaw&r=0",
            iteme: {
                [1]: { cate: 13, nume: "Praf de Pusca", itemid: "praf" },
                [2]: { cate: 21, nume: "Fier", itemid: "fier" }
            }
        },
        [23]: {
            numemasina: "wammo|WEAPON_ASSAULTRIFLE",
            link: "https://th.bing.com/th/id/R.51a5fb0876a99d5497a55540e06ac4a1?rik=azBqQEIO44O6BA&riu=http%3a%2f%2fwww.midsouthshooterssupply.com%2fimages%2fcategory-headers%2fammunition.jpg&ehk=5ZMwGMqiwOuG2WIN7Cjd2p%2b3TFAw1rLGyNL23nwPXTE%3d&risl=&pid=ImgRaw&r=0",
            iteme: {
                [1]: { cate: 44, nume: "Praf de Pusca", itemid: "praf" },
                [2]: { cate: 48, nume: "Fier", itemid: "fier" }
            }
        },
        [24]: {
            numemasina: "prafpusca",
            link: "https://media.discordapp.net/attachments/991091747662749709/991867140560916511/gunpowdder-removebg-preview.png",
            iteme: {
                [1]: { cate: 23, nume: "Carbune", itemid: "carbune" },
                [2]: { cate: 21, nume: "Sulf", itemid: "sulf" }
            }
        },
        [25]: {
            numemasina: "wbody|WEAPON_PISTOL50",
            link: "https://media.discordapp.net/attachments/991091747662749709/991864929684557854/deagle___pistol50-removebg-preview.png",
            iteme: {
                [1]: { cate: 21, nume: "Cupru", itemid: "cupru" },
                [2]: { cate: 37, nume: "Argint", itemid: "argint" },
                [3]: { cate: 50, nume: "Fier", itemid: "fier" }
            }
        }
    },
    [2]: {
        [1]: {
            numemasina: "gem",
            link: "https://media.discordapp.net/attachments/991091747662749709/992003293951832114/gem-de-capsuni-fara-conservanti-11-removebg-preview.png",
            iteme: {
                [1]: { cate: 34, nume: "Capsuni", itemid: "capsune" },
                [2]: { cate: 11, nume: "Gelatina", itemid: "gelatina" }
            }
        },
        [2]: {
            numemasina: "gem1",
            link: "https://media.discordapp.net/attachments/991091747662749709/992003296791363634/1920x_Dulceata-de-afine-343-removebg-preview.png",
            iteme: {
                [1]: { cate: 34, nume: "Afine", itemid: "afine" },
                [2]: { cate: 11, nume: "Gelatina", itemid: "gelatina" }
            }
        }
    }
}


lastdata = data

function raspuns() {
    $.post('https://oxy_craft/select', JSON.stringify({}));
}