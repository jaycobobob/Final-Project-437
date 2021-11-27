let genericStory = {
    situation: "",

    choice1Text: "",
    choice1MoneyMod: 0,
    choice1DevotionMod: 0,
    choice1FollowersMod: 0,
    choice1MoralityMod: 0,

    choice2Text: "",
    choice2MoneyMod: 0,
    choice2DevotionMod: 0,
    choice2FollowersMod: 0,
    choice2MoralityMod: 0,
}

let neutralEvents = [
    {
        situation: "One of your followers would like to start a fellowship basketball team.  Do you:",

        choice1Text: "Allocate funds to basketball team.",
        choice1MoneyMod: -2,
        choice1DevotionMod: 2,
        choice1FollowersMod: 0,
        choice1MoralityMod: 0,

        choice2Text: "Deny funds.",
        choice2MoneyMod: -3,
        choice2DevotionMod: -2,
        choice2FollowersMod: 0,
        choice2MoralityMod: 0,
    },
    {
        situation: "Orphans from a nearby town seek refuge.  Do you:",

        choice1Text: "Allow entrance.",
        choice1MoneyMod: -2,
        choice1DevotionMod: 0,
        choice1FollowersMod: 3,
        choice1MoralityMod: 2,

        choice2Text: "Deny entrance.",
        choice2MoneyMod: 0,
        choice2DevotionMod: 0,
        choice2FollowersMod: -3,
        choice2MoralityMod: -2,
    },
    {
        situation: "An ominous drone has been circling the compound.  Do you:",

        choice1Text: "Throw rocks at drone.",
        choice1MoneyMod: 0,
        choice1DevotionMod: 1,
        choice1FollowersMod: 0,
        choice1MoralityMod: -3,

        choice2Text: "Ignore the drone.",
        choice2MoneyMod: 0,
        choice2DevotionMod: -2,
        choice2FollowersMod: 0,
        choice2MoralityMod: 2,
    },
    {
        situation: "A recent movie star has come to check the compound.  Do you:",

        choice1Text: "Ask for a donation.",
        choice1MoneyMod: 3,
        choice1DevotionMod: 2,
        choice1FollowersMod: 0,
        choice1MoralityMod: -2,

        choice2Text: "Give them a compound tour and invite them back.",
        choice2MoneyMod: 3,
        choice2DevotionMod: 3,
        choice2FollowersMod: 0,
        choice2MoralityMod: 0,
    },
    {
        situation: "Your followers would like to purchase a Nintendo switch.  Do you:",

        choice1Text: "Grant funds for Switch.",
        choice1MoneyMod: -4,
        choice1DevotionMod: -2,
        choice1FollowersMod: 0,
        choice1MoralityMod: 1,

        choice2Text: "Deny funds.",
        choice2MoneyMod: 0,
        choice2DevotionMod: -2,
        choice2FollowersMod: 0,
        choice2MoralityMod: 0,
    },
    {
        situation: "A member gets possessed during a group seance!  Do you:",

        choice1Text: "Speak to the possessed follower.",
        choice1MoneyMod: 0,
        choice1DevotionMod: 3,
        choice1FollowersMod: 0,
        choice1MoralityMod: 0,

        choice2Text: "Order everyone in the group to abandon the ritual.",
        choice2MoneyMod: 0,
        choice2DevotionMod: -2,
        choice2FollowersMod: 0,
        choice2MoralityMod: 0,
    },
    {
        situation: "Your followers would like to experiment with drug induced rituals.  Do you:",

        choice1Text: "Allow drugs into the compound.",
        choice1MoneyMod: 0,
        choice1DevotionMod: 1,
        choice1FollowersMod: 0,
        choice1MoralityMod: -4,

        choice2Text: "Deny drug use.  The body must stay clean for the lord.",
        choice2MoneyMod: 0,
        choice2DevotionMod: 2,
        choice2FollowersMod: 0,
        choice2MoralityMod: 1,
    },
    {
        situation: "You suspect that a follower of the organization is actually an undercover agent.  Do you:",

        choice1Text: "Execute the suspect.  Guilty until proven innocent!",
        choice1MoneyMod: 0,
        choice1DevotionMod: 3,
        choice1FollowersMod: 0,
        choice1MoralityMod: -5,

        choice2Text: "Wait for additional evidence before approaching the man.",
        choice2MoneyMod: -2,
        choice2DevotionMod: -3,
        choice2FollowersMod: 0,
        choice2MoralityMod: 2,
    },
    {
        situation: "A natural disaster happened nearby.  Do you:",

        choice1Text: "Temporarily convert the compound into a storm shelter and disaster relief area.",
        choice1MoneyMod: -6,
        choice1DevotionMod: 0,
        choice1FollowersMod: 4,
        choice1MoralityMod: 4,

        choice2Text: "Only help members of the group.",
        choice2MoneyMod: -2,
        choice2DevotionMod: 2,
        choice2FollowersMod: 0,
        choice2MoralityMod: 0,
    },
    {
        situation: "Your followers will not stop singing \"The Box\" by Roddy Rich.  Do you:",

        choice1Text: "Make it the group's anthem.",
        choice1MoneyMod: 0,
        choice1DevotionMod: 2,
        choice1FollowersMod: 0,
        choice1MoralityMod: 3,

        choice2Text: "Ban the singing and listening of the song.",
        choice2MoneyMod: 0,
        choice2DevotionMod: -4,
        choice2FollowersMod: 0,
        choice2MoralityMod: -5,
    },
    {
        situation: "There has been a rat infection in your office.  Do you:",

        choice1Text: "Call an exterminator to deal with the rats.",
        choice1MoneyMod: -3,
        choice1DevotionMod: 0,
        choice1FollowersMod: 0,
        choice1MoralityMod: 0,

        choice2Text: "Order some of your followers to fix the problem.",
        choice2MoneyMod: 1,
        choice2DevotionMod: -2,
        choice2FollowersMod: 0,
        choice2MoralityMod: -2,
    },
    {
        situation: "To increase membership, you are considering starting up a social media page.  Do you:",

        choice1Text: "Start advertising your group online.",
        choice1MoneyMod: -3,
        choice1DevotionMod: 2,
        choice1FollowersMod: 4,
        choice1MoralityMod: 0,

        choice2Text: "Keep religious activities within the group.",
        choice2MoneyMod: 0,
        choice2DevotionMod: -2,
        choice2FollowersMod: 0,
        choice2MoralityMod: 0,
    },
    {
        situation: "A wanted criminal came to your church to confess.  The police are now at your door, looking for the man.  Do you:",

        choice1Text: "Hand over the criminal.",
        choice1MoneyMod: 5,
        choice1DevotionMod: 0,
        choice1FollowersMod: 0,
        choice1MoralityMod: 2,

        choice2Text: "Lie and tell them you haven't seen him.",
        choice2MoneyMod: 0,
        choice2DevotionMod: 0,
        choice2FollowersMod: 1,
        choice2MoralityMod: -5,
    },
    {
        situation: "A wandering healer would like to take refuge at your compound.  Do you:",

        choice1Text: "Allow him to stay.",
        choice1MoneyMod: 0,
        choice1DevotionMod: 0,
        choice1FollowersMod: 1,
        choice1MoralityMod: 0,

        choice2Text: "Deny him entrance.",
        choice2MoneyMod: 0,
        choice2DevotionMod: 0,
        choice2FollowersMod: -2,
        choice2MoralityMod: 0,
    },
    {
        situation: "An infectious disease is spreading through your group like wildfire.  Do you:",

        choice1Text: "Temporarily cease religious activities until the disease has subsided.",
        choice1MoneyMod: 0,
        choice1DevotionMod: -3,
        choice1FollowersMod: 0,
        choice1MoralityMod: 0,

        choice2Text: "Pretend the disease doesn't exist.",
        choice2MoneyMod: 0,
        choice2DevotionMod: -3,
        choice2FollowersMod: -5,
        choice2MoralityMod: -3,
    },
    {
        situation: "Suddenly, money rains from the sky and covers the compound.  Do you:",

        choice1Text: "Order your members to give you all the money.",
        choice1MoneyMod: 10,
        choice1DevotionMod: -5,
        choice1FollowersMod: 0,
        choice1MoralityMod: -4,

        choice2Text: "Distribute the money to your members.",
        choice2MoneyMod: 2,
        choice2DevotionMod: 4,
        choice2FollowersMod: 0,
        choice2MoralityMod: 2,
    },
    {
        situation: "Another nearby religious group wants to become friends and hold interfaith activities.  Do you:",

        choice1Text: "Agree to cooperate.  You can never have too many friends.",
        choice1MoneyMod: 0,
        choice1DevotionMod: 3,
        choice1FollowersMod: 1,
        choice1MoralityMod: 3,

        choice2Text: "Agree to cooperate, but steal from their compound when their guard is lowered.",
        choice2MoneyMod: 2,
        choice2DevotionMod: 1,
        choice2FollowersMod: 0,
        choice2MoralityMod: -2,
    },
    {
        situation: "You find conclusive, irrefutable evidence that aliens built the pyramids.  Do you:",

        choice1Text: "Share this information with the world!",
        choice1MoneyMod: 3,
        choice1DevotionMod: 1,
        choice1FollowersMod: 3,
        choice1MoralityMod: 1,

        choice2Text: "Introduce this as a tenant of your religion.  When the scientific community makes this discovery, the world will know the truth of your doctrine.",
        choice2MoneyMod: 0,
        choice2DevotionMod: 1,
        choice2FollowersMod: 5,
        choice2MoralityMod: -1,
    },
]

let lowMoneyEvents = [
    {
        situation: "Your followers are requesting a large feast to celebrate a group members birthday!  Do you:",

        choice1Text: "Agree to celebrate.  Let there be cake!",
        choice1MoneyMod: -4,
        choice1DevotionMod: 2,
        choice1FollowersMod: 0,
        choice1MoralityMod: 1,

        choice2Text: "Refuse their request.  We can't afford parties right now.",
        choice2MoneyMod: 0,
        choice2DevotionMod: -2,
        choice2FollowersMod: 0,
        choice2MoralityMod: -1,
    },
    {
        situation: "To raise money, an advisor suggests you attempt to copyright \"God\".  Do you:",

        choice1Text: "Approve the action.",
        choice1MoneyMod: 5,
        choice1DevotionMod: 0,
        choice1FollowersMod: 0,
        choice1MoralityMod: -5,

        choice2Text: "Refuse the proposal.",
        choice2MoneyMod: 0,
        choice2DevotionMod: 0,
        choice2FollowersMod: 0,
        choice2MoralityMod: 0,
    },
    {
        situation: "The group is running out of money.  Do you:",

        choice1Text: "Host a carnival, and use the proceeds to pay off debts.",
        choice1MoneyMod: 2,
        choice1DevotionMod: 0,
        choice1FollowersMod: 2,
        choice1MoralityMod: 0,

        choice2Text: "Order your members to commit crimes to raise money.",
        choice2MoneyMod: 5,
        choice2DevotionMod: 1,
        choice2FollowersMod: -4,
        choice2MoralityMod: -6,
    },
    {
        situation: "You suspect that a member has been stealing money from your organization.  Do you:",

        choice1Text: "Banish him to set an example for the others.",
        choice1MoneyMod: 3,
        choice1DevotionMod: 0,
        choice1FollowersMod: -1,
        choice1MoralityMod: 0,

        choice2Text: "Avoid conflict until you have proof.",
        choice2MoneyMod: -3,
        choice2DevotionMod: 0,
        choice2FollowersMod: 0,
        choice2MoralityMod: 1,
    },
    {
        situation: "Group members are complaining about outdated technology.  Do you:",

        choice1Text: "Purchase an Xbox.  LAN party anyone?",
        choice1MoneyMod: -4,
        choice1DevotionMod: 0,
        choice1FollowersMod: 0,
        choice1MoralityMod: 2,

        choice2Text: "Refuse.  You don’t need fast computers for group activity.",
        choice2MoneyMod: -2,
        choice2DevotionMod: 0,
        choice2FollowersMod: 0,
        choice2MoralityMod: 2,
    },
    {
        situation: "The IRS has sent an officer to audit your group for tax evasion.  Do you:",

        choice1Text: "Go to court and agree to pay back taxes.",
        choice1MoneyMod: -5,
        choice1DevotionMod: 0,
        choice1FollowersMod: 0,
        choice1MoralityMod: 2,

        choice2Text: "Have your followers take care of him.  He won\'t be finishing that audit anytime soon.",
        choice2MoneyMod: 0,
        choice2DevotionMod: 2,
        choice2FollowersMod: -1,
        choice2MoralityMod: -3,
    },
    {
        situation: "Some of your people are starving and need your help!  Do you:",

        choice1Text: "Organize a canned food drive.  The people must be fed.",
        choice1MoneyMod: -3,
        choice1DevotionMod: 2,
        choice1FollowersMod: 0,
        choice1MoralityMod: 3,

        choice2Text: "Call for a fast.  Our vigil shall regain the favor of God.",
        choice2MoneyMod: 0,
        choice2DevotionMod: 4,
        choice2FollowersMod: 0,
        choice2MoralityMod: -2,
    },
]

let highMoneyEvents = [
    {
        situation: "Some of your followers would like you to invest in Bitcoin.  Do you:",

        choice1Text: "Block chain party!",
        choice1MoneyMod: -5,
        choice1DevotionMod: 0,
        choice1FollowersMod: 0,
        choice1MoralityMod: 0,

        choice2Text: "Ignore them.  Cryptocurrencies are for fools.",
        choice2MoneyMod: 0,
        choice2DevotionMod: -3,
        choice2FollowersMod: -1,
        choice2MoralityMod: 0,
    },
    {
        situation: "That yacht on the lot is looking awfully nice lately...  Do you:",

        choice1Text: "Buy it! Your group members will love the party barge.",
        choice1MoneyMod: -18,
        choice1DevotionMod: 4,
        choice1FollowersMod: 5,
        choice1MoralityMod: 0,

        choice2Text: "Steal the boat.  You want it more than the current owner, so technically it should be yours.",
        choice2MoneyMod: -3,
        choice2DevotionMod: 0,
        choice2FollowersMod: -2,
        choice2MoralityMod: -3,
    },
]

let lowDevotionEvents = [
    {
        situation: "Rumors have begun circulating that you are no longer in good standing with your god.  Do you:",

        choice1Text: "Incentivize your followers to report each other for spreading rumors about you.",
        choice1MoneyMod: -1,
        choice1DevotionMod: 2,
        choice1FollowersMod: -4,
        choice1MoralityMod: -2,

        choice2Text: "Ignore them.  The rumors will stop eventually, right?",
        choice2MoneyMod: 0,
        choice2DevotionMod: -2,
        choice2FollowersMod: -3,
        choice2MoralityMod: 0,
    },
    {
        situation: "Local media outlets are saying that your group is a \"cult\", whatever that means.  Do you:",

        choice1Text: "Pay off the media outlets to stop this obvious disinformation campaign.",
        choice1MoneyMod: -5,
        choice1DevotionMod: -1,
        choice1FollowersMod: 0,
        choice1MoralityMod: -2,

        choice2Text: "Order more public relations events.",
        choice2MoneyMod: -2,
        choice2DevotionMod: -2,
        choice2FollowersMod: 1,
        choice2MoralityMod: 0,
    },
]

let highDevotionEvents = [
    {
        situation: "Members have decided to starve themselves as a way to please God. Do you:",

        choice1Text: "Order them to stop.  Physical and mental health is very important.",
        choice1MoneyMod: 0,
        choice1DevotionMod: -5,
        choice1FollowersMod: 0,
        choice1MoralityMod: 1,

        choice2Text: "Ignore it.  They\'ll stop eventually.  Hopefully...",
        choice2MoneyMod: 0,
        choice2DevotionMod: 2,
        choice2FollowersMod: -4,
        choice2MoralityMod: 0,
    },
    {
        situation: "An advisor recommends you run for local office.  Do you:",

        choice1Text: "Agree to run.  It worked for Mitt Romney, so why can\'t it work for you?",
        choice1MoneyMod: -5,
        choice1DevotionMod: 1,
        choice1FollowersMod: 2,
        choice1MoralityMod: -1,

        choice2Text: "Don't run.  You never were a fan of public speaking after all.",
        choice2MoneyMod: 0,
        choice2DevotionMod: -3,
        choice2FollowersMod: 0,
        choice2MoralityMod: 0,
    },
]

let lowFollowersEvents = [
    {
        situation: "Your numbers dwindle.  Your few followers come to your with their concerns about the lack of the faithful.  Do you:",

        choice1Text: "Tell them the unfaithful will be punished by god.  Hold the faith and they will prosper.",
        choice1MoneyMod: 0,
        choice1DevotionMod: 5,
        choice1FollowersMod: 0,
        choice1MoralityMod: 0,

        choice2Text: "Chastise them for not fulfilling their duty to educate the unenlightened.",
        choice2MoneyMod: 0,
        choice2DevotionMod: -2,
        choice2FollowersMod: 2,
        choice2MoralityMod: 0,
    },
]

let highFollowersEvents = [
    {
        situation: "Your numbers swell and your people want to take action.  Do you: ",

        choice1Text: "Take a march of faith through the land, doing good deeds and spreading the word.",
        choice1MoneyMod: -5,
        choice1DevotionMod: 4,
        choice1FollowersMod: 5,
        choice1MoralityMod: 3,

        choice2Text: "Raise arms as an army of the faithful and punish the heretics for their crimes against god.",
        choice2MoneyMod: -5,
        choice2DevotionMod: 5,
        choice2FollowersMod: -10,
        choice2MoralityMod: -15,
    },
    {
        situation: "Some of the members no longer believe in you, and leave the group to form an offshoot branch.  Do you:",

        choice1Text: "Let them leave peacefully.  They will realize the error of their ways at the day of judgement.",
        choice1MoneyMod: 0,
        choice1DevotionMod: -3,
        choice1FollowersMod: -15,
        choice1MoralityMod: 2,

        choice2Text: "Force them back to the group.  Their treasonous acts will not go unpunished.",
        choice2MoneyMod: 0,
        choice2DevotionMod: 3,
        choice2FollowersMod: -5,
        choice2MoralityMod: -3,
    },
]

let lowMoralityEvents = [
    {
        situation: "Some of your followers are complaining about the homeless problem in the area.  Do you:",

        choice1Text: "Recruit them and put them to work for the group.",
        choice1MoneyMod: 0,
        choice1DevotionMod: 0,
        choice1FollowersMod: 0,
        choice1MoralityMod: 1,

        choice2Text: "Ignore the homeless and leave them to suffer.",
        choice2MoneyMod: 0,
        choice2DevotionMod: 0,
        choice2FollowersMod: 0,
        choice2MoralityMod: -3,
    },
]

let veryLowMoralityEvents = [
    {
        situation: "Some of your advisors want to perform animal sacrifices.  Do you:",

        choice1Text: "Sacrifice a puppy from the local animal shelter.",
        choice1MoneyMod: 0,
        choice1DevotionMod: 2,
        choice1FollowersMod: 0,
        choice1MoralityMod: -4,

        choice2Text: "Banish the advisors who suggested it.  What kind of monster kills a dog?",
        choice2MoneyMod: 0,
        choice2DevotionMod: -1,
        choice2FollowersMod: -3,
        choice2MoralityMod: 1,
    },
    {
        situation: "The passing of the Damascus Comet signals the return of the ancient gods.  Do you:",

        choice1Text: "Storm an observatory to get a better view of the comet.",
        choice1MoneyMod: -3,
        choice1DevotionMod: 5,
        choice1FollowersMod: -1,
        choice1MoralityMod: -3,

        choice2Text: "Forcibly commit mass suicide with your followers.  We must rejoin our ancestors in the comet.",
        choice2MoneyMod: 0,
        choice2DevotionMod: 0,
        choice2FollowersMod: 0,
        choice2MoralityMod: -200,
    },
]

let highMoralityEvents = [
    {
        situation: "Your followers wish to give back to the community.  Do you:",

        choice1Text: "Have the group volunteer at the local food bank.",
        choice1MoneyMod: 0,
        choice1DevotionMod: 1,
        choice1FollowersMod: 1,
        choice1MoralityMod: 1,

        choice2Text: "Have the group volunteer at the animal shelter.  Dogs are better than people after all.",
        choice2MoneyMod: 0,
        choice2DevotionMod: 2,
        choice2FollowersMod: 0,
        choice2MoralityMod: 1,
    },
]