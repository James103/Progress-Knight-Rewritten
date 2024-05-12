/* function addMultipliers() {
    for (taskName in data.taskData) {
        var task = data.taskData[taskName]

        xpMultipliers = []
        if (task instanceof Job) incomeMultipliers = []

        xpMultipliers.push(getMaxLevelMultiplier.bind(task))
        xpMultipliers.push(getHappiness)
        xpMultipliers.push(getBindedTaskEffect("Dark influence"))
        xpMultipliers.push(getBindedTaskEffect("Demon training"))

        if (task instanceof Job) {
            incomeMultipliers.push(getLevelMultiplier.bind(task))
            incomeMultipliers.push(getBindedTaskEffect("Demon's wealth"))
            xpMultipliers.push(getBindedTaskEffect("Productivity"))
            xpMultipliers.push(getBindedItemEffect("Personal squire"))    
        } else if (task instanceof Skill) {
            xpMultipliers.push(getBindedTaskEffect("Concentration"))
            xpMultipliers.push(getBindedItemEffect("Book"))
            xpMultipliers.push(getBindedItemEffect("Study desk"))
            xpMultipliers.push(getBindedItemEffect("Library"))
        }

        if (jobCategories["Military"].includes(name)) {
            incomeMultipliers.push(getBindedTaskEffect("Strength"))
            xpMultipliers.push(getBindedTaskEffect("Battle tactics"))
            xpMultipliers.push(getBindedItemEffect("Steel longsword"))
        } else if (name == "Strength") {
            xpMultipliers.push(getBindedTaskEffect("Muscle memory"))
            xpMultipliers.push(getBindedItemEffect("Dumbbells"))
        } else if (skillCategories["Magic"].includes(name)) {
            xpMultipliers.push(getBindedItemEffect("Sapphire charm"))
        } else if (jobCategories["The Arcane Association"].includes(name)) {
            xpMultipliers.push(getBindedTaskEffect("Mana control"))
        } else if (skillCategories["Dark magic"].includes(name)) {
            xpMultipliers.push(getEvil)
        }
    }

    for (itemName in data.itemData) {
        var item = data.itemData[itemName]
        item.expenseMultipliers = []
        item.expenseMultipliers.push(getBindedTaskEffect("Bargaining"))
        item.expenseMultipliers.push(getBindedTaskEffect("Intimidation"))
    }
}


function applyMultipliers(value, multipliers) {
    var finalMultiplier = 1
    multipliers.forEach(function(multiplierFunction) {
        var multiplier = multiplierFunction()
        finalMultiplier *= multiplier
    })
    var finalValue = Math.round(value * finalMultiplier)
    return finalValue
}

*/

function checkIfJobIsSelected(jobName) {
    var boolean = true
    for (i = 0; i < data.selectedJobs.length; i++) {
        if (jobName !== data.selectedJobs[i].name) {
            boolean *= true
        } else boolean *= false
    }
    return boolean
}

function selectJob(jobName) {
    if (checkIfJobIsSelected(jobName)) {
        if (data.selectedJobs.length >= data.maxJobs) {
            data.selectedJobs.shift()
        }
        data.selectedJobs.push(data.job[jobName])
    }
}

function checkIfSkillIsSelected(skillName) {
    var boolean = true
    for (i = 0; i < data.selectedSkills.length; i++) {
        if (skillName !== data.selectedSkills[i].name) {
            boolean *= true
        } else boolean *= false
    }
    return boolean
}

function selectSkill(skillName) {
    if (checkIfSkillIsSelected(skillName)) {
        if (data.selectedSkills.length >= data.maxSkills) {
            data.selectedSkills.shift()
        }
        data.selectedSkills.push(data.skill[skillName])
    }
}
function sellItem(itemName) {
    if (data.item[itemName].owned == true) {
        data.item[itemName].owned = false
        data.coins += data.item[itemName].price / 2
    }
}

function buyItem(itemName) {
    if (data.item[itemName].owned == false, data.coins >= data.item[itemName].price) {
        data.item[itemName].owned = true
        data.coins -= data.item[itemName].price
    }
}

function selectHome(homeName) {
    if (data.selectedHome.name !== homeName) {
        data.selectedHome = data.home[homeName]
    }
}

function getNet() {
    return Math.abs(getIncome() - getExpense())
}

function getIncome() {
    var income = 0
    for (i = 0; i < data.selectedJobs.length; i++) {
        if (data.selectedJobs[i].incomeFormula = "normal") {
            var incomeMult = data.selectedJobs[i].level
        }
    income += data.selectedJobs[i].income * incomeMult
    }
    return income
}

function getExpense() {
    var expense = 0
    var itemArray = Object.values(data.item)
    for (i = 0; i < itemArray.length; i++) {
        if (itemArray[i].owned == true) {
            expense += itemArray[i].upkeep
        }
    }
    if (data.selectedHome.owned == false) {
        expense += data.selectedHome.rent
    }
    return expense
}

function applyExpenses() {
    var coins = applySpeed(getExpense())
    data.coins -= coins
    if (data.coins < 0) {    
        goBankrupt()
    }
}

function getLifespan() {
    return data.baseLifespan
}

function goBankrupt() {
    data.coins = 0
    data.currentHome = data.home["Homeless"] //set it to the best bought house
}

function increaseCoins() {
    data.coins += applySpeed(getIncome())
}

function getGameSpeed() {
    var gameSpeed = data.baseGameSpeed * +!data.paused * +isAlive()
    return gameSpeed
}

function applySpeed(value) {
    finalValue = value * getGameSpeed() / data.settings.updateSpeed
    return finalValue
}

function increaseDays() {
    var increase = applySpeed(1)
    data.days += increase
}

function doSelectedSkills() {
    for (i = 0; i < data.selectedSkills.length; i++) {
        doCurrentSkill(data.selectedSkills[i].name)
    }
}

function doCurrentSkill(skillName) {
    var skillXp = 100 * data.skill[skillName].xpMult * data.skillXpMult / data.settings.updateSpeed
    while (skillXp + data.skill[skillName].xp > data.skill[skillName].maxXp) {
        var excessXp = skillXp + data.skill[skillName].xp - data.skill[skillName].maxXp
        data.skill[skillName].level++
        var skillXp = excessXp
    }
    data.skill[skillName].xp += skillXp
}

function doSelectedJobs() {
    for (i = 0; i < data.selectedJobs.length; i++) {
        doCurrentJob(data.selectedJobs[i].name)
    }
}

function doCurrentJob(jobName) {
    var jobXp = 100 * data.job[jobName].xpMult * data.jobXpMult / data.settings.updateSpeed
    while (jobXp + data.job[jobName].xp > data.job[jobName].maxXp) {
        var excessXp = jobXp + data.job[jobName].xp - data.job[jobName].maxXp
        data.job[jobName].level++
        var jobXp = excessXp
    }
    data.job[jobName].xp += jobXp
}

function showInfo() {
    const element = document.getElementById("info");
    element.classList.remove("hidden");
}

function hideInfo() {
    const element = document.getElementById("info");
    element.classList.add("hidden");
}

function isAlive() {
    if (data.days < data.lifespan) {
        hideInfo();
        return true;
    } else {
        showInfo();
        return false
    }
}

function update() {
    increaseDays()
    //autoPromote()
    //autoLearn()
    doSelectedSkills()
    doSelectedJobs()
    applyExpenses()
    updateUI()
}

//init

setTab("hero")
update()
setInterval(update, 1000 / data.settings.updateSpeed)
//setInterval(saveGameData, 3000)