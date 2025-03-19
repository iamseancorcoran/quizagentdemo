/**
 * Large question pools for videos
 * Each video has 10 questions, from which 3 will be randomly selected for each quiz session
 * This ensures that each time a user takes a quiz, they are likely to see different questions
 */

const questionPools = {
    "video1": [
        // Ethereum Explained in 5 Minutes – Quick Overview for Beginners!
        {
            question: "According to the 5-minute Ethereum explanation, what is Ethereum?",
            options: [
                { text: "A type of cryptocurrency", correct: false },
                { text: "A decentralized blockchain platform", correct: true },
                { text: "A web hosting service", correct: false },
                { text: "A programming language", correct: false }
            ]
        },
        {
            question: "What can be created and deployed on Ethereum?",
            options: [
                { text: "Only cryptocurrencies", correct: false },
                { text: "Only financial applications", correct: false },
                { text: "Decentralized applications (dApps)", correct: true },
                { text: "Mobile apps", correct: false }
            ]
        },
        {
            question: "How does Ethereum differ from Bitcoin?",
            options: [
                { text: "Ethereum has no cryptocurrency", correct: false },
                { text: "Ethereum was designed primarily for broader applications beyond financial transactions", correct: true },
                { text: "Ethereum cannot be used for payments", correct: false },
                { text: "Ethereum is centralized", correct: false }
            ]
        },
        {
            question: "What powers the Ethereum network?",
            options: [
                { text: "Solar energy", correct: false },
                { text: "Ether (ETH)", correct: true },
                { text: "Bitcoin", correct: false },
                { text: "Government subsidies", correct: false }
            ]
        },
        {
            question: "What are smart contracts in Ethereum?",
            options: [
                { text: "Legal documents signed online", correct: false },
                { text: "Self-executing contracts with terms written in code", correct: true },
                { text: "Contracts that automatically pay dividends", correct: false },
                { text: "Contracts between miners", correct: false }
            ]
        },
        {
            question: "What happens when someone wants to perform an action on the Ethereum network?",
            options: [
                { text: "They must request permission from the Ethereum Foundation", correct: false },
                { text: "They must pay a fee in Ether called 'gas'", correct: true },
                { text: "They must verify their identity with KYC", correct: false },
                { text: "They must wait for network approval", correct: false }
            ]
        },
        {
            question: "What technology does Ethereum use as its foundation?",
            options: [
                { text: "Artificial Intelligence", correct: false },
                { text: "Blockchain technology", correct: true },
                { text: "Cloud computing", correct: false },
                { text: "Quantum computing", correct: false }
            ]
        },
        {
            question: "What year was the Ethereum white paper published?",
            options: [
                { text: "2009", correct: false },
                { text: "2013", correct: true },
                { text: "2015", correct: false },
                { text: "2017", correct: false }
            ]
        },
        {
            question: "Who is credited with creating Ethereum?",
            options: [
                { text: "Satoshi Nakamoto", correct: false },
                { text: "Vitalik Buterin", correct: true },
                { text: "Elon Musk", correct: false },
                { text: "Mark Zuckerberg", correct: false }
            ]
        },
        {
            question: "What does 'decentralized' mean in the context of Ethereum?",
            options: [
                { text: "It's controlled by multiple governments", correct: false },
                { text: "It operates without a central authority or single point of control", correct: true },
                { text: "It's distributed across multiple continents", correct: false },
                { text: "It has multiple currencies", correct: false }
            ]
        }
    ],
    "video2": [
        // What is ETHEREUM? ETH Crypto Explained! (Animated)
        {
            question: "What is Ether (ETH) described as in the animated explanation?",
            options: [
                { text: "Digital art", correct: false },
                { text: "A type of computer hardware", correct: false },
                { text: "The fuel that powers operations on the Ethereum network", correct: true },
                { text: "A programming language", correct: false }
            ]
        },
        {
            question: "How is Ethereum often described in the animated video?",
            options: [
                { text: "The world computer", correct: true },
                { text: "The internet of money", correct: false },
                { text: "The blockchain revolution", correct: false },
                { text: "The digital currency", correct: false }
            ]
        },
        {
            question: "What is the fee called that users pay to perform actions on the Ethereum network?",
            options: [
                { text: "Tax", correct: false },
                { text: "Toll", correct: false },
                { text: "Gas", correct: true },
                { text: "Commission", correct: false }
            ]
        },
        {
            question: "According to the animated video, what makes Ethereum different from Bitcoin?",
            options: [
                { text: "Ethereum is cheaper to use", correct: false },
                { text: "Ethereum allows programmable smart contracts", correct: true },
                { text: "Ethereum is older than Bitcoin", correct: false },
                { text: "Ethereum is controlled by a central authority", correct: false }
            ]
        },
        {
            question: "In the animated explanation, what is Ethereum compared to?",
            options: [
                { text: "A digital bank", correct: false },
                { text: "A global computer", correct: true },
                { text: "A stock exchange", correct: false },
                { text: "A government agency", correct: false }
            ]
        },
        {
            question: "What role do miners play in the Ethereum network according to the animation?",
            options: [
                { text: "They create new Ethereum tokens", correct: false },
                { text: "They validate transactions and secure the network", correct: true },
                { text: "They program smart contracts", correct: false },
                { text: "They regulate the price of Ether", correct: false }
            ]
        },
        {
            question: "What is the main purpose of gas fees in Ethereum?",
            options: [
                { text: "To make developers rich", correct: false },
                { text: "To pay miners/validators for processing transactions", correct: true },
                { text: "To reduce the total supply of Ethereum", correct: false },
                { text: "To fund the Ethereum Foundation", correct: false }
            ]
        },
        {
            question: "What happens when someone deploys a smart contract on Ethereum?",
            options: [
                { text: "It must be approved by the Ethereum Foundation", correct: false },
                { text: "It becomes part of the blockchain and can be executed by anyone", correct: true },
                { text: "It is kept private and only used by the creator", correct: false },
                { text: "It must be verified by traditional legal systems", correct: false }
            ]
        },
        {
            question: "According to the animation, why is decentralization important for Ethereum?",
            options: [
                { text: "It makes transactions faster", correct: false },
                { text: "It eliminates the need for miners", correct: false },
                { text: "It removes control from any single entity or government", correct: true },
                { text: "It makes Ethereum more profitable", correct: false }
            ]
        },
        {
            question: "What is the relationship between smart contracts and dApps in Ethereum?",
            options: [
                { text: "They are the same thing", correct: false },
                { text: "Smart contracts are the building blocks of dApps", correct: true },
                { text: "dApps are used to create smart contracts", correct: false },
                { text: "They operate independently of each other", correct: false }
            ]
        }
    ],
    "video3": [
        // The Greatest Ethereum Explanation of ALL TIME (in Under 10 Minutes)!
        {
            question: "Who founded Ethereum according to 'The Greatest Ethereum Explanation'?",
            options: [
                { text: "Satoshi Nakamoto", correct: false },
                { text: "Vitalik Buterin", correct: true },
                { text: "Charles Hoskinson", correct: false },
                { text: "Elon Musk", correct: false }
            ]
        },
        {
            question: "What is the Ethereum Virtual Machine (EVM)?",
            options: [
                { text: "A physical computer that runs Ethereum", correct: false },
                { text: "A virtual reality environment for blockchain developers", correct: false },
                { text: "A Turing-complete software that enables developers to build and deploy dApps", correct: true },
                { text: "A cryptocurrency mining program", correct: false }
            ]
        },
        {
            question: "What major upgrade has Ethereum undergone?",
            options: [
                { text: "Transition from ASCII to Unicode", correct: false },
                { text: "Transition from Proof-of-Work to Proof-of-Stake", correct: true },
                { text: "Transition from Web2 to Web3", correct: false },
                { text: "Transition from Bitcoin to Ether", correct: false }
            ]
        },
        {
            question: "What makes Ethereum's blockchain revolutionary compared to Bitcoin's?",
            options: [
                { text: "It's faster", correct: false },
                { text: "It's programmable", correct: true },
                { text: "It's cheaper to use", correct: false },
                { text: "It's more secure", correct: false }
            ]
        },
        {
            question: "What problem did Ethereum aim to solve?",
            options: [
                { text: "The energy consumption of Bitcoin mining", correct: false },
                { text: "The limited programming capabilities of Bitcoin's blockchain", correct: true },
                { text: "The high transaction fees of traditional banking", correct: false },
                { text: "The volatility of cryptocurrency prices", correct: false }
            ]
        },
        {
            question: "What are gas fees used for in Ethereum?",
            options: [
                { text: "Funding the Ethereum Foundation", correct: false },
                { text: "Paying for computational resources on the network", correct: true },
                { text: "Regulating the price of Ether", correct: false },
                { text: "Creating new tokens", correct: false }
            ]
        },
        {
            question: "What is 'Ethereum 2.0' primarily aimed at improving?",
            options: [
                { text: "User interface", correct: false },
                { text: "Scalability, security, and sustainability", correct: true },
                { text: "Integration with traditional finance", correct: false },
                { text: "Compatibility with older devices", correct: false }
            ]
        },
        {
            question: "What distinguishes a dApp from a traditional application?",
            options: [
                { text: "dApps are always free to use", correct: false },
                { text: "dApps run on decentralized blockchain networks instead of centralized servers", correct: true },
                { text: "dApps can only be used for financial transactions", correct: false },
                { text: "dApps are only available on mobile devices", correct: false }
            ]
        },
        {
            question: "According to the video, what is a key benefit of Ethereum's decentralization?",
            options: [
                { text: "Faster transaction speeds", correct: false },
                { text: "Lower fees than traditional banking", correct: false },
                { text: "Resistance to censorship and control", correct: true },
                { text: "Better user interface", correct: false }
            ]
        },
        {
            question: "What is 'sharding' in the context of Ethereum 2.0?",
            options: [
                { text: "Dividing the blockchain into smaller, more manageable pieces", correct: true },
                { text: "Encrypting transaction data", correct: false },
                { text: "Sharing mining rewards more fairly", correct: false },
                { text: "Breaking down smart contracts into modules", correct: false }
            ]
        }
    ],
    "video4": [
        // Ethereum Explained For Beginners – Simple 8 Minute Explanation
        {
            question: "According to the 8-minute explanation, when was Ethereum proposed?",
            options: [
                { text: "2010", correct: false },
                { text: "2013", correct: true },
                { text: "2015", correct: false },
                { text: "2017", correct: false }
            ]
        },
        {
            question: "When did Ethereum go live?",
            options: [
                { text: "2013", correct: false },
                { text: "2015", correct: true },
                { text: "2017", correct: false },
                { text: "2020", correct: false }
            ]
        },
        {
            question: "What is the key feature that sets Ethereum apart from Bitcoin?",
            options: [
                { text: "Its faster transaction speed", correct: false },
                { text: "Its lower transaction fees", correct: false },
                { text: "Its programmability", correct: true },
                { text: "Its higher market capitalization", correct: false }
            ]
        },
        {
            question: "What does Ethereum enable beyond simple currency transactions?",
            options: [
                { text: "Only NFT trading", correct: false },
                { text: "Only DeFi applications", correct: false },
                { text: "Only gaming applications", correct: false },
                { text: "Complex applications and smart contracts", correct: true }
            ]
        },
        {
            question: "What is the native cryptocurrency of the Ethereum platform?",
            options: [
                { text: "Bitcoin", correct: false },
                { text: "Ether", correct: true },
                { text: "Ethereum Coin", correct: false },
                { text: "EthToken", correct: false }
            ]
        },
        {
            question: "What determines the cost of gas for an Ethereum transaction?",
            options: [
                { text: "The size of the transaction in bytes", correct: false },
                { text: "The complexity of the computation required", correct: true },
                { text: "The current price of Ether", correct: false },
                { text: "The location of the user", correct: false }
            ]
        },
        {
            question: "What type of applications can be built on Ethereum?",
            options: [
                { text: "Only financial applications", correct: false },
                { text: "Only games", correct: false },
                { text: "Only marketplaces", correct: false },
                { text: "A wide variety of applications including finance, gaming, and more", correct: true }
            ]
        },
        {
            question: "What are 'nodes' in the Ethereum network?",
            options: [
                { text: "Physical mining equipment", correct: false },
                { text: "Computers running the Ethereum software", correct: true },
                { text: "The developers of the Ethereum platform", correct: false },
                { text: "Financial institutions that validate transactions", correct: false }
            ]
        },
        {
            question: "How are decisions made about changes to the Ethereum protocol?",
            options: [
                { text: "By Vitalik Buterin alone", correct: false },
                { text: "By a vote among Ether holders", correct: false },
                { text: "Through Ethereum Improvement Proposals and community consensus", correct: true },
                { text: "By regulatory agencies", correct: false }
            ]
        },
        {
            question: "What is meant by 'state transition' in Ethereum?",
            options: [
                { text: "The process of miners changing location", correct: false },
                { text: "The change in the overall state of the network after each block is processed", correct: true },
                { text: "The movement of Ether from one exchange to another", correct: false },
                { text: "The transition from Ethereum 1.0 to 2.0", correct: false }
            ]
        }
    ],
    "video5": [
        // How Blockchain Makes Your Degree Cheat-Proof (LegiCred Case Study)
        {
            question: "How does blockchain technology help verify academic credentials?",
            options: [
                { text: "By storing them in a traditional database", correct: false },
                { text: "By creating tamper-proof, verifiable records", correct: true },
                { text: "By printing secure certificates", correct: false },
                { text: "By requiring password access", correct: false }
            ]
        },
        {
            question: "What is one benefit of using blockchain for credential verification?",
            options: [
                { text: "It requires more paperwork", correct: false },
                { text: "It makes verification slower", correct: false },
                { text: "It eliminates the need for time-consuming background checks", correct: true },
                { text: "It centralizes all credential data", correct: false }
            ]
        },
        {
            question: "Who controls the verification process in a blockchain credential system?",
            options: [
                { text: "A single educational institution", correct: false },
                { text: "Government agencies only", correct: false },
                { text: "No single entity (it's decentralized)", correct: true },
                { text: "Employers", correct: false }
            ]
        },
        {
            question: "What problem does blockchain solve in academic credential verification?",
            options: [
                { text: "The cost of printing certificates", correct: false },
                { text: "The ease of forging traditional paper certificates", correct: true },
                { text: "The availability of education", correct: false },
                { text: "The quality of education programs", correct: false }
            ]
        },
        {
            question: "How can employers verify blockchain-based credentials?",
            options: [
                { text: "By contacting the school directly", correct: false },
                { text: "By checking a public blockchain with a verification tool", correct: true },
                { text: "By hiring a verification agency", correct: false },
                { text: "By asking for the student's private key", correct: false }
            ]
        },
        {
            question: "What makes blockchain records tamper-proof?",
            options: [
                { text: "They are stored on government servers", correct: false },
                { text: "They use simple password protection", correct: false },
                { text: "They are cryptographically secured and distributed across many computers", correct: true },
                { text: "They are hidden from public view", correct: false }
            ]
        },
        {
            question: "What advantage does blockchain verification offer to students?",
            options: [
                { text: "Higher grades", correct: false },
                { text: "Lower tuition costs", correct: false },
                { text: "Permanent, easily shareable proof of their credentials", correct: true },
                { text: "Automatic job placement", correct: false }
            ]
        },
        {
            question: "What is a key feature of the LegiCred system described in the video?",
            options: [
                { text: "It only works for certain universities", correct: false },
                { text: "It creates blockchain-based, verifiable academic credentials", correct: true },
                { text: "It replaces traditional degrees entirely", correct: false },
                { text: "It only stores graduate degrees", correct: false }
            ]
        },
        {
            question: "How does blockchain technology prevent credential fraud?",
            options: [
                { text: "By requiring additional identity verification", correct: false },
                { text: "By restricting access to credential information", correct: false },
                { text: "By making changes to records trackable and visible", correct: true },
                { text: "By having universities approve each verification", correct: false }
            ]
        },
        {
            question: "What long-term problem does blockchain credential verification solve?",
            options: [
                { text: "The cost of higher education", correct: false },
                { text: "The quality of educational programs", correct: false },
                { text: "The difficulty of verifying credentials if an institution closes", correct: true },
                { text: "The popularity of certain degree programs", correct: false }
            ]
        }
    ]
};

// Export the question pools
export default questionPools;
