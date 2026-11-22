const POPULARITY_THRESHOLD = 5;
const QUOTES = [
  {
    "id": "cc3580b5726c",
    "character": "Ross",
    "text": "Pivot! Pivot! Pivot! Pivot! Pivot!",
    "popularity": 999999
  },
  {
    "id": "dad5341107d1",
    "character": "Joey",
    "text": "It's a moo point. It's like a cow's opinion; it doesn't matter. It's moo.",
    "popularity": 999999
  },
  {
    "id": "07885189f09f",
    "character": "Joey",
    "text": "Yeah, that's right. I stepped up! She's my friend and she needed help. And if I have to I'd pee on any one of you.",
    "popularity": 999999
  },
  {
    "id": "5ff74b287d64",
    "character": "Phoebe",
    "text": "But they don't know that we know they know we know!",
    "popularity": 999999
  },
  {
    "id": "ad4b7daa6e77",
    "character": "Phoebe",
    "text": "This is brand-new information!",
    "popularity": 999999
  },
  {
    "id": "f64ee1d03845",
    "character": "Phoebe",
    "text": "Phoebe. That's P, as in Phoebe, H as in hoebe, O as in oebe, E as in ebe, B as in bebe, and E as in 'Ello there mate.",
    "popularity": 999999
  },
  {
    "id": "6ab92c98f862",
    "character": "Ross",
    "text": "Unagi.",
    "popularity": 999999
  },
  {
    "id": "b17be4bdcc47",
    "character": "Rachel",
    "text": "Just so you know, it's not that common, it doesn't happen to every guy, and it is a big deal!",
    "popularity": 999999
  },
  {
    "id": "50787a29ac09",
    "character": "Joey",
    "text": "Here come the meat sweats.",
    "popularity": 999999
  },
  {
    "id": "25a64d3a04cf",
    "character": "Joey",
    "text": "Look at me! I'm Chandler! Could I be wearing any more clothes?!",
    "popularity": 999999
  },
  {
    "id": "e57a50fb5ae7",
    "character": "Joey Tribbiani",
    "text": "How you doin'?",
    "popularity": 1100
  },
  {
    "id": "c1c9b9fdea6e",
    "character": "Ross",
    "text": "We were on a break!",
    "popularity": 726
  },
  {
    "id": "2c5a20f93824",
    "character": "Chandler",
    "text": "I'm not so good with the advice... Can I interest you in a sarcastic comment?",
    "popularity": 619
  },
  {
    "id": "38e8954fa18a",
    "character": "Chandler",
    "text": "I can handle this. \"Handle\" is my middle name. Actually, \"handle\" is the middle of my first name.",
    "popularity": 508
  },
  {
    "id": "84c64f431a44",
    "character": "Janice",
    "text": "Oh... my... God!",
    "popularity": 337
  },
  {
    "id": "e5e6ffc3a398",
    "character": "Phoebe",
    "text": "[Right after playing a song in the coffee shop] If you want to receive e-mails about my upcoming shows, then please give me money so I can buy a computer.",
    "popularity": 316
  },
  {
    "id": "30bf743643d8",
    "character": "Rachel",
    "text": "I don't want my baby's first words to be \"How You Doing\"",
    "popularity": 187
  },
  {
    "id": "d40c59e46c57",
    "character": "Chandler",
    "text": "[to Ross] Three failed marriages, two illegitimate children... The personal ad writes itself.",
    "popularity": 169
  },
  {
    "id": "645873bcb809",
    "character": "Monica",
    "text": "Guys can fake it? Unbelievable! The one thing that's ours!",
    "popularity": 141
  },
  {
    "id": "6c260b477159",
    "character": "Joey",
    "text": "I'm Joey. I'm disgusting. I make low-budget adult films.",
    "popularity": 127
  },
  {
    "id": "617d6e1fa4f3",
    "character": "Phoebe",
    "text": "Chandler still thinks I'm pregnant and he hasn't asked me how I'm feeling or offered to carry my bags. I feel bad for the woman who ends up with him.",
    "popularity": 86
  },
  {
    "id": "4a885dd5d043",
    "character": "Chandler",
    "text": "All right, kids, I gotta get to work. If I don't input those numbers... it doesn't make much of a difference.",
    "popularity": 77
  },
  {
    "id": "5c952d5cd0cc",
    "character": "Chandler",
    "text": "I can't say hump or screw in front of the b-a-b-y... I just spelled the wrong words didn't I?",
    "popularity": 57
  },
  {
    "id": "23a3c05a6a91",
    "character": "Ross",
    "text": "If you're going to call me names, I would prefer Ross, the Divorce Force. It's just cooler.",
    "popularity": 37
  },
  {
    "id": "091b838a26b9",
    "character": "Phoebe",
    "text": "I may play the fool at times but I'm a little more than just a pretty blonde girl with an ass that won't quit.",
    "popularity": 28
  },
  {
    "id": "266e2ffb66bc",
    "character": "Ross",
    "text": "You know, we should probably ask the doctor if she even knows how to deliver a baby that's half human, half *pure evil*!",
    "popularity": 28
  },
  {
    "id": "4453988f79db",
    "character": "Joey",
    "text": "Va fa napoli.",
    "popularity": 19
  },
  {
    "id": "35734b50a64b",
    "character": "Joey Tribbiani",
    "text": "[after smelling potpourri] Well, this is like summer in a bowl!",
    "popularity": 16
  },
  {
    "id": "4e2bdc088990",
    "character": "Phoebe",
    "text": "Oh, look. Ugly Naked Guy is decorating his Christmas tree. Wow, you should see the size of his Christmas balls.",
    "popularity": 16
  },
  {
    "id": "066190dff474",
    "character": "Joey",
    "text": "Why do you have to break up with her? Be a man. Just stop calling.",
    "popularity": 15
  },
  {
    "id": "69bdfe511aa9",
    "character": "Phoebe",
    "text": "Charlotte? You know, with the web? She has babies, then she dies. It's like, \"Hey, mom, welcome home from the hospital.\" THUD.",
    "popularity": 14
  },
  {
    "id": "9d7971094f61",
    "character": "Frank Buffay Jr.",
    "text": "My sister's having my baby.",
    "popularity": 13
  },
  {
    "id": "52198e42f3b0",
    "character": "Phoebe",
    "text": "Come on Ross, you're a paleontologist, dig a little deeper.",
    "popularity": 12
  },
  {
    "id": "58faba2ae2b5",
    "character": "Chandler",
    "text": "All right, look if you absolutely have to tell her the truth, at least wait until the timing's right. And that's what deathbeds are for.",
    "popularity": 11
  },
  {
    "id": "5aa78d715492",
    "character": "Gunther",
    "text": "Hey buddy, this is a family place. Put the mouse back in the house.",
    "popularity": 11
  },
  {
    "id": "ca984d032f8d",
    "character": "Chandler",
    "text": "...And I'm not sure about this actor guy, because when he left a message and he heard my name \"Chandler Bing\", he said \"Woah! Short message!\"",
    "popularity": 11
  },
  {
    "id": "33e9c280b75b",
    "character": "Monica",
    "text": "This has been like my dream ever since I got my first Easy-Bake Oven and opened \"Easy Monica's Bakery\".",
    "popularity": 10
  },
  {
    "id": "f8c1e6b7ea72",
    "character": "Joey",
    "text": "Dude, stop talkin' crazy and make us some tea!",
    "popularity": 10
  },
  {
    "id": "a4a4ec836ae1",
    "character": "Phoebe",
    "text": "[singing] Jingle bitch screwed me over. Go to hell jingle whore. Go to hell, go to hell, go to hell.",
    "popularity": 9
  },
  {
    "id": "15f25a3cad16",
    "character": "Joey Tribbiani",
    "text": "You don't put words in people's mouths, you put *turkey* in people's mouths!",
    "popularity": 9
  },
  {
    "id": "2584f230f97d",
    "character": "Phoebe",
    "text": "There was a crooked man, who had a crooked smile, who lived in a shoe, for a... while...",
    "popularity": 8
  },
  {
    "id": "facc9798ab77",
    "character": "Chandler",
    "text": "Ding dong, the psycho's gone.",
    "popularity": 8
  },
  {
    "id": "0ad87bf8d3e6",
    "character": "Benjamin Hobart",
    "text": "If you say yes, I'm serious, if you say no, I'm joking.",
    "popularity": 8
  },
  {
    "id": "1787cae7ad78",
    "character": "Phoebe",
    "text": "[sings] Smelly cat, smelly cat, what are they feeding you? / Smelly cat, smelly cat, it's not your fault!",
    "popularity": 8
  },
  {
    "id": "1e38822451b1",
    "character": "Joey",
    "text": "Joey doesn't share food!",
    "popularity": 8
  },
  {
    "id": "a571ee6d028b",
    "character": "Joey",
    "text": "What? You made a bet. A bet is a bet. You bet on a bet, and if you lose you lose the bet.",
    "popularity": 7
  },
  {
    "id": "3a04b12fbfb5",
    "character": "Chandler",
    "text": "Hey, you know, I have had it with you guys and your \"cancer\" and your \"emphysema\" and your \"heart disease.\" The bottom line is smoking is cool and you know it.",
    "popularity": 7
  },
  {
    "id": "db634e3f9d48",
    "character": "Rachel",
    "text": "Ooh, I'm a man. Ooh, I have a penis. Ooh, I have to win money to exert my power over women.",
    "popularity": 7
  },
  {
    "id": "a4f50548c8c8",
    "character": "Monica",
    "text": "I can't believe my dad saw us having sex. He didn't make it to one of my piano recitals, but this he sees.",
    "popularity": 6
  },
  {
    "id": "65e9a13a5d1d",
    "character": "Rachel",
    "text": "[upon receiving her first paycheck] Who's FICA? Why is he getting all my money?",
    "popularity": 6
  },
  {
    "id": "75158fa00fcd",
    "character": "Rachel",
    "text": "How do you expect me to grow if you won't let me blow?",
    "popularity": 6
  },
  {
    "id": "d93361a45d2b",
    "character": "Joey",
    "text": "I'm a Tribianni! And this is what we do! We may not be great thinkers, or great leaders, we may not be able to run very fast but God Dammit we can eat!",
    "popularity": 6
  },
  {
    "id": "7ee7ba315491",
    "character": "Joey Tribbiani",
    "text": "[upon hearing Ross doesn't want to go to the movies with him] Come on, man! Tom Hanks! Meg Ryan! They get mail!",
    "popularity": 5
  },
  {
    "id": "21f893091f9e",
    "character": "Rachel",
    "text": "Cool. \"Urkel\" in Spanish is \"Urkel.\"",
    "popularity": 5
  },
  {
    "id": "bd0aea24e83a",
    "character": "Chandler",
    "text": "Stay... stay. Good fake dog.",
    "popularity": 5
  },
  {
    "id": "08639cdb4bf3",
    "character": "Phoebe",
    "text": "Hey, can we turn on the TV? I think it's raining outside.",
    "popularity": 5
  },
  {
    "id": "b00b941f5e0a",
    "character": "Joey",
    "text": "Well, I'm sorry if I'm not a middle-aged black woman. And I'm also sorry if sometimes I go to the wrong audition.",
    "popularity": 5
  },
  {
    "id": "4e50e757b220",
    "character": "Richard",
    "text": "[about Chandler & Joey] They're different from my other friends, they don't start sentences with \"you know who just died shoveling snow?\"",
    "popularity": 5
  },
  {
    "id": "12caa5c19405",
    "character": "Chandler",
    "text": "Goodbye, you fruit drying psychopath.",
    "popularity": 5
  },
  {
    "id": "39c42bbf011d",
    "character": "Janice",
    "text": "Chandler Bing.",
    "popularity": 5
  },
  {
    "id": "9710849fcd5e",
    "character": "Ross",
    "text": "Because women never like Joey. You know, I hear he's a virgin?",
    "popularity": 5
  },
  {
    "id": "488d46bdfb2b",
    "character": "Janice",
    "text": "Goodnight my Bing-a-ling.",
    "popularity": 4
  },
  {
    "id": "a22ab362bacc",
    "character": "Rachel",
    "text": "Do you know the only person who'd wanna listen to this? A mental health professional. And that's only because they get paid a hundred dollars an hour.",
    "popularity": 4
  },
  {
    "id": "33a6762be0dc",
    "character": "Phoebe",
    "text": "My mom used to stick her head in the oven. Actually she only did it the once, but it was pretty weird.",
    "popularity": 4
  },
  {
    "id": "00b688910677",
    "character": "Phoebe",
    "text": "Hello, my name is Clunkers. May I please stay with you nice people?",
    "popularity": 4
  },
  {
    "id": "757b24b52e40",
    "character": "Phoebe",
    "text": "Soap Opera Digest. That's one of my favorite digests.",
    "popularity": 4
  },
  {
    "id": "ad743f1855ba",
    "character": "Joey",
    "text": "There's no juice for the people who need the juice and want the juice and I need the juice.",
    "popularity": 4
  },
  {
    "id": "77fe05dcd1a0",
    "character": "Ross",
    "text": "Hey, remember when I had a monkey? Yeah, what was I thinking?",
    "popularity": 4
  },
  {
    "id": "b500f4cbd150",
    "character": "Joey",
    "text": "Paper, snow, a Ghost!",
    "popularity": 4
  },
  {
    "id": "20acd20f3128",
    "character": "Ross",
    "text": "Mississippilessly?",
    "popularity": 4
  },
  {
    "id": "b8042ef2e249",
    "character": "Joey",
    "text": "It's just my character that's not brain-dead.",
    "popularity": 4
  },
  {
    "id": "5e3c4710c3c1",
    "character": "Ross",
    "text": "No divorces in '99!",
    "popularity": 4
  },
  {
    "id": "df6c6bea5d02",
    "character": "Monica",
    "text": "You can't fire me. I make your decisions and I say, \"I'm not fired.\" Ha.",
    "popularity": 3
  },
  {
    "id": "0ad82c594815",
    "character": "Monica",
    "text": "Is it me? Is it like I have a beacon that only dogs and men with severe emotional problems can hear?",
    "popularity": 3
  },
  {
    "id": "ba09bc7a8258",
    "character": "Chandler",
    "text": "Ew, ew, ew, ew ew ew ew ew. Ugly Naked Guy got a Thighmaster.",
    "popularity": 3
  },
  {
    "id": "a14c730528fd",
    "character": "Chandler",
    "text": "[to a woman] Come on, I'll show you to my room... Wow, that sounds weird when it's not followed by \"No thanks, it's late\".",
    "popularity": 3
  },
  {
    "id": "1d3ecba48350",
    "character": "Erica",
    "text": "[playing a joke on Chandler] It'd really mean a lot to me, if the baby was a boy, if you'd name him after my father - JimminyBillyBob.",
    "popularity": 3
  },
  {
    "id": "9c8a29f48164",
    "character": "Chandler",
    "text": "[talking to Monica about the new house] When did you start crapping money?",
    "popularity": 3
  },
  {
    "id": "109f91d4eb84",
    "character": "Monica",
    "text": "Damn the jellyfish! Damn ALL the jellyfish!",
    "popularity": 3
  },
  {
    "id": "a3ef5d889a06",
    "character": "Phoebe",
    "text": "PICK UP THE SOCK! PICK UP THE SOCK! PICK UP THE SOCK!",
    "popularity": 3
  },
  {
    "id": "7df4caef55c6",
    "character": "Ross",
    "text": "That sandwich was the one good thing in my life. Someone ate the one good thing in my life.",
    "popularity": 3
  },
  {
    "id": "a72db9f6951f",
    "character": "Phoebe",
    "text": "It's because of stuff like this that you're BURNING IN HELL!",
    "popularity": 3
  },
  {
    "id": "4842c5a67f22",
    "character": "Joey",
    "text": "[can't find the Hot Girl] Hot Girl? Hot Girl!",
    "popularity": 3
  },
  {
    "id": "d78a945fcf36",
    "character": "Phoebe",
    "text": "You know, we thought you were different. But I guess it was just the coma.",
    "popularity": 3
  },
  {
    "id": "4182ae844ee7",
    "character": "Phoebe",
    "text": "There's no such thing as an innocent Burger.",
    "popularity": 3
  },
  {
    "id": "132fb9f82fb6",
    "character": "Phoebe",
    "text": "I've done some research, and it turns out mink aren't very nice.",
    "popularity": 3
  },
  {
    "id": "67518489cb69",
    "character": "Phoebe",
    "text": "We're... just saying Goodbye to the Hotel. We LOVE you, Paradise Hotel, Golf Resort and Spa!",
    "popularity": 3
  },
  {
    "id": "bdb1d0dccdbb",
    "character": "Phoebe",
    "text": "Are you kidding, that woman has the nose of a bloodhound! And the breasts of a Greek Goddess...",
    "popularity": 3
  },
  {
    "id": "a14b72a12aa7",
    "character": "Joey",
    "text": "You're a pain in my ass, Geller!",
    "popularity": 3
  },
  {
    "id": "7b8d704f5f65",
    "character": "Phoebe",
    "text": "[Imitating someone really annoying] \"Oh, I slept with Billy Joel.\" Who hasn't?",
    "popularity": 2
  },
  {
    "id": "51b6d64ca23a",
    "character": "Ross",
    "text": "What the hell are you doing, you scared the crap out of me!",
    "popularity": 2
  },
  {
    "id": "e6bbbb18356c",
    "character": "Phoebe",
    "text": "Oh, my God! The foster puppets!",
    "popularity": 2
  },
  {
    "id": "fa1124fe628f",
    "character": "Joey",
    "text": "Get your sorry, non-believer ass out of my chair.",
    "popularity": 2
  },
  {
    "id": "527ed6ee4cd4",
    "character": "Rachel",
    "text": "Come on. You guys can pee standing up.",
    "popularity": 2
  },
  {
    "id": "190f84d00563",
    "character": "Chandler",
    "text": "You know what they say, ask your slippers a question... you're going crazy.",
    "popularity": 2
  },
  {
    "id": "f3f7a91676ee",
    "character": "Chandler",
    "text": "You took your eggs and you left. Do you really expect me never to find new eggs?",
    "popularity": 2
  },
  {
    "id": "397845b77834",
    "character": "Chandler",
    "text": "Am I sexy in Tulsa?",
    "popularity": 2
  },
  {
    "id": "805f5173f964",
    "character": "Chandler",
    "text": "I am holding up these cushions as a symbol of my remorse! Though you may haveth anger now...",
    "popularity": 2
  },
  {
    "id": "050106934374",
    "character": "Rachel",
    "text": "[Phoebe's \"sold out\" at a corporate massage parlour] Of course I admire you Phoebe! You have principles! I don't have any.",
    "popularity": 2
  },
  {
    "id": "10ab5b09cf0c",
    "character": "Chandler",
    "text": "[conflicted over Kathy] That's no good, I'm starting to yearn!",
    "popularity": 2
  },
  {
    "id": "533cd274078c",
    "character": "Phoebe",
    "text": "Stop, you guys! Look what you're doing to Chandler!",
    "popularity": 2
  },
  {
    "id": "3ce224ddfbda",
    "character": "Phoebe",
    "text": "Leave me behind! I'm just a machine!",
    "popularity": 2
  },
  {
    "id": "df714d8a935c",
    "character": "Phoebe",
    "text": "[making fun of TV] If I don't hold my hair, my head will fall off.",
    "popularity": 2
  },
  {
    "id": "1a0111106f63",
    "character": "Chandler",
    "text": "[making fun of TV] Oh she should not be wearing those pants! I say push her down the stairs!",
    "popularity": 2
  },
  {
    "id": "7d92604853a4",
    "character": "Joey",
    "text": "What are you worried about? The Vicar will be here any minute.",
    "popularity": 2
  },
  {
    "id": "fbdda5bb5a79",
    "character": "Stephen Waltham",
    "text": "I could kill you with my thumb, you know...",
    "popularity": 2
  },
  {
    "id": "99757cb7caeb",
    "character": "Ross",
    "text": "[she's lost his monkey] This is just classic Rachel! You're off in Rachel land with no thought for people's feelings or monkeys!",
    "popularity": 2
  },
  {
    "id": "26844b0eac0d",
    "character": "Joey",
    "text": "Hey, it's not the first time I lost a girl to a Cowboy spraying Cologne!",
    "popularity": 2
  },
  {
    "id": "a6e70026afe5",
    "character": "Joey",
    "text": "You bet on the bet and if you lose you lose the bet!",
    "popularity": 2
  },
  {
    "id": "cadc830cec22",
    "character": "Chandler",
    "text": "[Name the 50 States Game] If you can't do it you can't do it. That's the great thing about this game, it makes you want to kill yourself.",
    "popularity": 2
  },
  {
    "id": "44a4e0912333",
    "character": "Barbershop Quartet Singer",
    "text": "No-one likes a Buttmunch!",
    "popularity": 2
  },
  {
    "id": "aaf9d5cce9b6",
    "character": "Chandler",
    "text": "[can't talk Phoebe's boyfriend out of moving in with her] Were your parents HAPPY or something?",
    "popularity": 2
  },
  {
    "id": "3404d9d0d0a8",
    "character": "Ross",
    "text": "I went through the same thing with Carol and you know what I did? I got dressed really quickly.",
    "popularity": 2
  },
  {
    "id": "ab1bf35eb880",
    "character": "Phoebe",
    "text": "This was back when I thought everything that rhymed was true.",
    "popularity": 2
  },
  {
    "id": "083ec82a7a7e",
    "character": "Phoebe",
    "text": "Really? Misery really does love company?",
    "popularity": 2
  },
  {
    "id": "56105233d51a",
    "character": "Monica",
    "text": "That's probably because their nerves are deadened from being so stupid.",
    "popularity": 2
  },
  {
    "id": "48260848def5",
    "character": "Ross",
    "text": "Did you see the kid on that nose?",
    "popularity": 2
  },
  {
    "id": "9c9d005faea2",
    "character": "Ross",
    "text": "I'm FINE!",
    "popularity": 2
  },
  {
    "id": "bae8e27d3ec7",
    "character": "Jack Geller",
    "text": "Now, are you his Mother or his Father? What? I've never seen one before! I never even got a chance to pretend I'm okay with it...",
    "popularity": 2
  },
  {
    "id": "69ac8f516c4e",
    "character": "Monica",
    "text": "Whoa. Where you going in those pants? 1982?",
    "popularity": 1
  },
  {
    "id": "6a15a659e859",
    "character": "Dr. Long",
    "text": "[It's triplets] Doctors are wrong all the time.",
    "popularity": 1
  },
  {
    "id": "bab5ef664b96",
    "character": "Chandler",
    "text": "[Everyone's hugging] Aw... oh that's right, I have no-one.",
    "popularity": 1
  },
  {
    "id": "9654b61cddbb",
    "character": "Ross",
    "text": "[Long, serious lecture] All of which proves that I thought of Jurassic Park first.",
    "popularity": 1
  },
  {
    "id": "89a84eb58c31",
    "character": "Gunther",
    "text": "I broke a cup.",
    "popularity": 1
  },
  {
    "id": "f0a126639259",
    "character": "Monica",
    "text": "So if your parents had stayed together you'd be able to answer a question like a normal person?",
    "popularity": 1
  },
  {
    "id": "634968b3fc1c",
    "character": "Rachel",
    "text": "Ever since I was humiliated, I've not been in a very museum-benefitty sort of place.",
    "popularity": 1
  },
  {
    "id": "cac76326b000",
    "character": "Chandler",
    "text": "Go with the Egg, my friend!",
    "popularity": 1
  },
  {
    "id": "2d14e86111e4",
    "character": "Bully",
    "text": "[to Chandler] You know what I don't like about you? You've always got something to say.",
    "popularity": 1
  },
  {
    "id": "a2a89f1a27f0",
    "character": "Margha",
    "text": "Is it alright if I stay and watch? I can't go back yet, my roommate is vershlocking a big American Businessman.",
    "popularity": 1
  },
  {
    "id": "5426e609bc1d",
    "character": "Joey",
    "text": "I just dropped by to say you're not a real Doctor! And that woman's brain... is fine.",
    "popularity": 1
  },
  {
    "id": "c63d3a7f416d",
    "character": "Joey",
    "text": "Chandler is a mysterious fellow, one unlikely to take a wife.",
    "popularity": 1
  },
  {
    "id": "dab201c97f5d",
    "character": "Stephen Waltham",
    "text": "Do you want a piece of me, is that it? Do you want a piece of me?",
    "popularity": 1
  },
  {
    "id": "6af85047ac7f",
    "character": "Joey",
    "text": "I want to be Mr. Hugglemunch!",
    "popularity": 1
  },
  {
    "id": "9fb873aa3b3f",
    "character": "Ross",
    "text": "NO FALAFEL FOR YOU!",
    "popularity": 1
  },
  {
    "id": "82ec4a65f452",
    "character": "Ross",
    "text": "Cat!",
    "popularity": 1
  },
  {
    "id": "251fdd37d0d8",
    "character": "Joey Tribbiani",
    "text": "Opposite is opposite!",
    "popularity": 1
  },
  {
    "id": "faa6cac61bab",
    "character": "Monica",
    "text": "You are just going to have to stop pissing me off.",
    "popularity": 1
  },
  {
    "id": "d1b98d6ad2a4",
    "character": "Judy Geller",
    "text": "Oh, God. There's a toe in my kitchen...",
    "popularity": 1
  },
  {
    "id": "bdadf52aedbb",
    "character": "Chandler",
    "text": "When I get back it's going to be Chair City, and I'll be the one who's sitting on chairs!",
    "popularity": 1
  },
  {
    "id": "970cb3ddda12",
    "character": "Ross",
    "text": "Ugly Baby Judges you!",
    "popularity": 1
  },
  {
    "id": "f970cee98b94",
    "character": "Chandler",
    "text": "Full bag... warm bowl... something horrible must have happened here!",
    "popularity": 1
  },
  {
    "id": "b15aa9a7a4ac",
    "character": "Chandler",
    "text": "Big head, big head, big head!",
    "popularity": 1
  },
  {
    "id": "493337fe384e",
    "character": "Chandler",
    "text": "When I get back it'll be Chair City, and I'll be the one who's sitting on Chairs!",
    "popularity": 1
  },
  {
    "id": "af104eb9f954",
    "character": "Phoebe",
    "text": "I just gave birth to three children and I will not see them grow up in a World where Joey is right!",
    "popularity": 1
  },
  {
    "id": "21078d65a1f4",
    "character": "Chandler",
    "text": "Hell is full of people like you.",
    "popularity": 1
  },
  {
    "id": "9d85d49128ad",
    "character": "Ross",
    "text": "There was nothing in your father's fridge except Heavy Cream and Bacon. I think I solved the mystery of the heart attack.",
    "popularity": 1
  },
  {
    "id": "61ce25c219cb",
    "character": "Nora Bing",
    "text": "[Wedding] Oh, Chandler! We thought we messed you up so much, this day would never come!",
    "popularity": 1
  },
  {
    "id": "7f3d20204d7e",
    "character": "Chandler",
    "text": "He said \"Hey Todd, want a donut?\" And I wanted a donut. So now it's five years later, the donut's gone, and I'm still Todd.",
    "popularity": 1
  },
  {
    "id": "ae894d574f1b",
    "character": "Phoebe",
    "text": "Boobs will help us figure it out.",
    "popularity": 1
  },
  {
    "id": "432058db64a8",
    "character": "Richard",
    "text": "I like them better than my other friends, all they say is: \"Do you know who just died shovelling snow?\"",
    "popularity": 1
  },
  {
    "id": "237921293e4e",
    "character": "Kid",
    "text": "Hey, is this the place with the Singing Lady who Tells the Truth?",
    "popularity": 1
  },
  {
    "id": "2eb78b2ec209",
    "character": "Phoebe",
    "text": "I'm not going to let that man make you eat your Baby.",
    "popularity": 1
  },
  {
    "id": "8a3ce553497e",
    "character": "Joey",
    "text": "It must have been a great play, because I didn't understand a single word of it!",
    "popularity": 1
  },
  {
    "id": "e43d47530707",
    "character": "Ross",
    "text": "I KNEW YOU'D BE MY DEATH, PHOEBE BUFFAY!",
    "popularity": 1
  },
  {
    "id": "49a7a74c5174",
    "character": "Croupier",
    "text": "Stop it!",
    "popularity": 1
  },
  {
    "id": "83dc0fd6c28a",
    "character": "Joey",
    "text": "Don't interrupt me when I'm talking to God!",
    "popularity": 1
  },
  {
    "id": "07e9a2686501",
    "character": "Rachel",
    "text": "Oh my God, he Dream Cheated on you!",
    "popularity": 1
  },
  {
    "id": "9ba326ab102e",
    "character": "Joey",
    "text": "One day you're Dr Drake Ramoray, the next you're eating ketchup straight out of the bottle!",
    "popularity": 1
  },
  {
    "id": "5c36b4cede14",
    "character": "Ross",
    "text": "You deserve someone who knows what he has when he has you.",
    "popularity": 1
  },
  {
    "id": "08b66e441acb",
    "character": "Phoebe",
    "text": "So it seems that I was born, and then everyone started lying their asses off?",
    "popularity": 1
  },
  {
    "id": "d2749679a10e",
    "character": "Phoebe",
    "text": "Hey, look, I have Elbows! Ahhh!",
    "popularity": 1
  },
  {
    "id": "556bba1e0f17",
    "character": "Phoebe",
    "text": "That is Brand New Information!",
    "popularity": 1
  },
  {
    "id": "14f670427bc0",
    "character": "Chandler",
    "text": "It bodes well for me that speed impresses you.",
    "popularity": 1
  },
  {
    "id": "19658edd58a5",
    "character": "Chandler",
    "text": "There's a time and a place! That's what deathbed confessions are for!",
    "popularity": 1
  },
  {
    "id": "90c8b1c72995",
    "character": "Chandler",
    "text": "Does she not deserve Love? Don't look at me like that, he's the one that wants to bonk the Maniac!",
    "popularity": 1
  },
  {
    "id": "8e7f91490edc",
    "character": "Chandler",
    "text": "You kissed my best Ross!",
    "popularity": 1
  },
  {
    "id": "f555cfca81a8",
    "character": "Joey",
    "text": "What's wrong with me? It looked more delicious when it was a penis!",
    "popularity": 1
  },
  {
    "id": "4085589849ee",
    "character": "Chandler",
    "text": "So, is he house trained or is he going to leave little bathroom tiles all over the place?",
    "popularity": 0
  },
  {
    "id": "384460c8a1dd",
    "character": "Rachel",
    "text": "[goes crosseyed] Wow, must have been Drake.",
    "popularity": 0
  },
  {
    "id": "93eb764fa73c",
    "character": "Chandler",
    "text": "[Drunk, Ross and Chandler's famous romance-author Mother kissed] I expect this from her, she's always been a Freudian nightmare.",
    "popularity": 0
  },
  {
    "id": "0359f9cf1736",
    "character": "Joey",
    "text": "You're mean in England!",
    "popularity": 0
  },
  {
    "id": "c5e58c06ae9e",
    "character": "Jessica Lockhart",
    "text": "What writer? Was it bald or was it tall?",
    "popularity": 0
  },
  {
    "id": "f925c5d1ccf2",
    "character": "Monica",
    "text": "There may be something we can fashion.",
    "popularity": 0
  },
  {
    "id": "64458301366e",
    "character": "Richard",
    "text": "Let's never speak of this.",
    "popularity": 0
  },
  {
    "id": "d8ed480d72eb",
    "character": "Joey",
    "text": "This, more than anything, is a staging area.",
    "popularity": 0
  },
  {
    "id": "6f4a4c8f3da5",
    "character": "Ross",
    "text": "You're going to destroy the Whole Illusion of the Party!",
    "popularity": 0
  },
  {
    "id": "89c9c5c83ecf",
    "character": "Joey's Hand",
    "text": "Hi Daddy! Why don't you live with Mommy? Who's that other Lady? What's a Lesbian?",
    "popularity": 0
  },
  {
    "id": "80b97c2d425f",
    "character": "Chandler",
    "text": "Who's the Bitterest man in the living room/ the Bitterest man in the living room? Hello, Neighbour!",
    "popularity": 0
  },
  {
    "id": "291d69b3fa5c",
    "character": "Joey",
    "text": "Up is not an option.",
    "popularity": 0
  },
  {
    "id": "b8893e1944ac",
    "character": "Rachel",
    "text": "Aw, this is a present from my boyfriend. It's a Love Bug, ha!",
    "popularity": 0
  },
  {
    "id": "bb75e80f2016",
    "character": "Chandler",
    "text": "You made my girlfriend think!",
    "popularity": 0
  },
  {
    "id": "74027dc62bb0",
    "character": "Ross",
    "text": "There's going to be Hoopla?",
    "popularity": 0
  },
  {
    "id": "e5543235ce4f",
    "character": "Joey",
    "text": "The guy is like a cartoon!",
    "popularity": 0
  },
  {
    "id": "c8e66a1dea9c",
    "character": "Rachel",
    "text": "I'm tired of getting clobbered.",
    "popularity": 0
  },
  {
    "id": "1c60a0415068",
    "character": "Rachel",
    "text": "I can't go alone to my own Prom, it's too harsh!",
    "popularity": 0
  },
  {
    "id": "fb7d74e9f4f6",
    "character": "Ross",
    "text": "My Dad would say \"Why are you messing around with Dinosaur Toys? Why don't you go out and play like a Real Boy!\"",
    "popularity": 0
  },
  {
    "id": "771ef602cb38",
    "character": "Jack Geller",
    "text": "[watches touchdown on pocket TV at Funeral] God, now I'm Depressed! I mean more than before...",
    "popularity": 0
  },
  {
    "id": "25db6f6de445",
    "character": "Monica",
    "text": "[Caught Phonehacking] I might be getting my period, I don't know.",
    "popularity": 0
  },
  {
    "id": "08276236316a",
    "character": "Joey",
    "text": "They say I was so badly injured that the only person who could have saved me was me. It's some kind of Irony...",
    "popularity": 0
  },
  {
    "id": "d5258f24f2cc",
    "character": "Chandler",
    "text": "Something funny about sneakers.",
    "popularity": 0
  },
  {
    "id": "342522d4feed",
    "character": "Monica",
    "text": "It turns out Fun Bobby was Fun for a Reason!",
    "popularity": 0
  },
  {
    "id": "52dc278edb50",
    "character": "Joey",
    "text": "Rachel, if you're going to the airport, could you get me one of those Tobelerone Bars?",
    "popularity": 0
  },
  {
    "id": "b36080b154ea",
    "character": "Joey",
    "text": "No, I'm upset because nobody believed Quincy's Theory!",
    "popularity": 0
  },
  {
    "id": "7457d3a57546",
    "character": "Joey",
    "text": "I am very wisdomous.",
    "popularity": 0
  },
  {
    "id": "0144d14bc0f9",
    "character": "Rachel",
    "text": "Oh, who are you, the Memory Woman?",
    "popularity": 0
  },
  {
    "id": "720eaa1a1dbd",
    "character": "Rachel",
    "text": "Oh, could you please, for once, just not remember every little thing?",
    "popularity": 0
  },
  {
    "id": "ee92d066ec42",
    "character": "Pete",
    "text": "I like it when we put things on the head of a pin.",
    "popularity": 0
  },
  {
    "id": "bc6ea9be78b3",
    "character": "Rachel",
    "text": "Okay, walk us through it, honey, walk us through it.",
    "popularity": 0
  },
  {
    "id": "5d984d544214",
    "character": "Rachel",
    "text": "I'm okay. I've got my girls.",
    "popularity": 0
  },
  {
    "id": "e618524f1b3b",
    "character": "Richard",
    "text": "If it's not a Right Angle, it's a Wrong Angle!",
    "popularity": 0
  },
  {
    "id": "0f6aa12eef7e",
    "character": "Joey",
    "text": "Morning's here! Morning is here!",
    "popularity": 0
  },
  {
    "id": "78922e02b187",
    "character": "Jack Geller",
    "text": "I never used to picture you having sex at all. It was a simpler time.",
    "popularity": 0
  },
  {
    "id": "27bf26bb40ba",
    "character": "Joey",
    "text": "What happens when you flick it?",
    "popularity": 0
  },
  {
    "id": "d31304a82683",
    "character": "Chandler",
    "text": "So, Janice, who's the lucky guy whose essence you've stolen?",
    "popularity": 0
  },
  {
    "id": "7dd3dfc5010f",
    "character": "Chandler",
    "text": "What if Joey was President?",
    "popularity": 0
  },
  {
    "id": "693d3d32742e",
    "character": "Chandler",
    "text": "If only there were something in your head to stop you saying stupid stuff!",
    "popularity": 0
  },
  {
    "id": "30cf021606d9",
    "character": "Ross",
    "text": "Eeee!",
    "popularity": 0
  },
  {
    "id": "5c16b7956638",
    "character": "Joey",
    "text": "He's finally letting her have it!",
    "popularity": 0
  },
  {
    "id": "697f4a1b19fe",
    "character": "Dr Long",
    "text": "Please don't name your Baby Phaebo.",
    "popularity": 0
  },
  {
    "id": "61694a9b308c",
    "character": "Chandler",
    "text": "So the question is: How dumb are you?",
    "popularity": 0
  },
  {
    "id": "b00895c38190",
    "character": "Ross",
    "text": "Come here to me...",
    "popularity": 0
  },
  {
    "id": "3d1173563d56",
    "character": "Monica",
    "text": "Well, I lost my Erection!",
    "popularity": 0
  },
  {
    "id": "e762e4e9b661",
    "character": "Chandler",
    "text": "Could we be more white trash?",
    "popularity": 0
  },
  {
    "id": "4db3d676defc",
    "character": "Janice",
    "text": "What we have is like Movie Love.",
    "popularity": 0
  },
  {
    "id": "e5ac9a70f40b",
    "character": "Chandler",
    "text": "You can't leave me! I've got your shoe!",
    "popularity": 0
  },
  {
    "id": "676102e07f2b",
    "character": "Chandler",
    "text": "I guess that's why they call it Psychology, Sir.",
    "popularity": 0
  },
  {
    "id": "7d22863c6ed6",
    "character": "Rachel",
    "text": "You know, when it's not a headboard it's not worth it!",
    "popularity": 0
  },
  {
    "id": "9334c469d487",
    "character": "Rachel",
    "text": "Well, I don't know all the words!",
    "popularity": 0
  },
  {
    "id": "1b174f0f2ce7",
    "character": "Ross",
    "text": "Hi...",
    "popularity": 0
  },
  {
    "id": "2217aa1527b9",
    "character": "Chandler",
    "text": "He said, \"Hi, Bob! Want a donut?\" And I wanted a Donut. And now it's 5 years later, the donut's gone, and I'm still Bob.",
    "popularity": 0
  },
  {
    "id": "501904529191",
    "character": "Copy Shop Girl",
    "text": "Is this because I stole one of your shoes? I'm sorry. I do that!",
    "popularity": 0
  },
  {
    "id": "0749a5c45947",
    "character": "Rachel",
    "text": "I thought I would catch up on my Correspondence.",
    "popularity": 0
  },
  {
    "id": "83145c73b404",
    "character": "Chandler",
    "text": "Oh, the Humanity!",
    "popularity": 0
  },
  {
    "id": "3c2b62225ccc",
    "character": "Phoebe",
    "text": "Oh, yay!",
    "popularity": 0
  }
];

function run(input) {
  const rawCharacter = input?.trmnl?.plugin_settings?.custom_fields_values?.character;
  const requestedCharacter = typeof rawCharacter === "string" ? rawCharacter.trim().toLowerCase() : "all";
  const character = ["chandler", "joey", "monica", "phoebe", "rachel", "ross"].includes(requestedCharacter)
    ? requestedCharacter : "all";
  const matchingQuotes = QUOTES.filter((quote) => character === "all" || quote.character.split(" ")[0].toLowerCase() === character);
  const eligibleQuotes = matchingQuotes.length ? matchingQuotes : QUOTES;
  const previousId = input?.trmnl?.state?.last_quote_id;
  const previousQuote = QUOTES.find((quote) => quote.id === previousId);
  const popularQuotes = previousQuote && previousQuote.popularity < POPULARITY_THRESHOLD
    ? eligibleQuotes.filter((quote) => quote.popularity > POPULARITY_THRESHOLD)
    : eligibleQuotes;
  const selectionPool = popularQuotes.length ? popularQuotes : eligibleQuotes;
  const alternatives = selectionPool.filter((quote) => quote.id !== previousId);
  const candidates = alternatives.length ? alternatives : selectionPool;
  const quote = candidates[Math.floor(Math.random() * candidates.length)];
  return {
    quote,
    quote_count: eligibleQuotes.length,
    trmnl_state: { last_quote_id: quote.id },
  };
}
