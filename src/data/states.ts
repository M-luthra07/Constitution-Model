export interface Law {
    title: string;
    description: string;
}

export interface StateEntity {
    name: string;
    type: 'State' | 'Union Territory';
    laws: Law[];
}

export const statesAndUTs: StateEntity[] = [
    {
        name: "Andhra Pradesh",
        type: "State",
        laws: [
            { title: "AP Disha Act", description: "Aims to speed up the justice process for crimes against women and children, mandating investigation completion within 7 days and trial within 14 working days." },
            { title: "AP Land Grabbing (Prohibition) Act", description: "Makes the illegal occupation of land a punishable offense and establishes special courts to resolve such cases quickly to protect property owners." },
            { title: "AP Gaming Act (Amendment)", description: "Bans online gaming, gambling, and betting involving money to prevent youth addiction and financial ruin." },
            { title: "AP Assigned Lands (Prohibition of Transfers) Act", description: "Prevents the sale or transfer of government land that was assigned to landless poor people for cultivation, ensuring it remains with the intended beneficiaries." },
            { title: "AP Public Security Act", description: "Grants the government special powers to deal with unlawful activities and organizations that threaten public order and security." },
            { title: "AP Devadasis (Prohibition of Dedication) Act", description: "Legally abolishes the practice of dedicating women as 'Devadasis' to temples, protecting them from exploitation and abuse." },
            { title: "AP Rights in Land and Pattadar Pass Books Act", description: "Regulates land ownership rights and mandates the issuance of 'Pattadar Pass Books' as official proof of land ownership for farmers." },
            { title: "AP Tenant Farmers (Protection of Rights) Act", description: "Provides legal recognition and protection to tenant farmers, allowing them to access bank loans and crop insurance without affecting the owner's title." },
            { title: "AP Infrastructure Development Enabling Act", description: "Creates a legal framework to encourage and streamline private sector investment in infrastructure projects like roads and power." },
            { title: "AP Micro Finance Institutions (Regulation of Money Lending) Act", description: "Regulates the interest rates and recovery methods of Micro Finance Institutions to protect rural borrowers from harassment and debt traps." }
        ]
    },
    {
        name: "Arunachal Pradesh",
        type: "State",
        laws: [
            { title: "Inner Line Permit (ILP)", description: "A mandatory travel document for Indian citizens from other states to enter Arunachal Pradesh, designed to protect the indigenous culture and demographics." },
            { title: "Arunachal Pradesh Freedom of Religion Act", description: "Prohibits religious conversions achieved through force, fraud, or inducement, ensuring that individuals change their faith only out of genuine free will." },
            { title: "Assam Frontier (Administration of Justice) Regulation", description: "Recognizes the legal authority of traditional village councils (Kebangs) to settle local disputes according to tribal customs." },
            { title: "Arunachal Pradesh Forest Act", description: "Governs the management and protection of the state's vast forest resources, regulating logging and forest produce collection." },
            { title: "Arunachal Pradesh Unlawful Activities (Prevention) Act", description: "Empowers the state police to detain individuals suspected of acting against the security and stability of the state." },
            { title: "Arunachal Pradesh Goods and Services Tax Act", description: "The state-specific law implementing the GST regime, governing how taxes are levied on goods and services within Arunachal Pradesh." },
            { title: "Arunachal Pradesh Panchayat Raj Act", description: "Establishes the structure and powers of local self-government bodies (Panchayats) in rural areas, ensuring local representation." },
            { title: "Arunachal Pradesh State Commission for Women Act", description: "Sets up a dedicated commission to investigate crimes against women and recommend policy changes to improve their status and safety." },
            { title: "Arunachal Pradesh Protection of Customary Rights", description: "Legally safeguards the traditional customary laws and practices of the various tribes regarding social and community matters." },
            { title: "Arunachal Pradesh Land Settlement and Records Act", description: "Provides the legal process for surveying land, settling ownership rights, and maintaining accurate land records in the state." }
        ]
    },
    {
        name: "Assam",
        type: "State",
        laws: [
            { title: "Assam Accord & NRC", description: "A legal framework focused on identifying and deporting illegal immigrants to protect the cultural and political rights of the indigenous people." },
            { title: "Assam Cattle Preservation Act, 2021", description: "Imposes strict restrictions on the slaughter of cattle and prohibits the sale of beef in areas with a predominantly non-beef-eating population." },
            { title: "Assam Tea Plantations Provident Fund Act", description: "Ensures that tea garden workers receive social security benefits like provident fund and pension, protecting their financial future." },
            { title: "Assam Witch Hunting (Prohibition, Prevention and Protection) Act", description: "Criminalizes the practice of witch-hunting, imposing strict penalties for branding or harming anyone under the guise of witchcraft." },
            { title: "Assam Preventive Detention Act", description: "Allows the government to detain individuals without trial for a limited period if they are deemed a threat to public order or security." },
            { title: "Assam Land and Revenue Regulation", description: "The primary law governing land rights, revenue assessment, and the collection of land taxes in the state." },
            { title: "Assam Ease of Doing Business Act", description: "Simplifies administrative procedures and reduces red tape to encourage businesses and industries to set up operations in Assam." },
            { title: "Assam Right to Public Services Act", description: "Guarantees that citizens receive specific government services (like certificates and licenses) within a fixed time limit, or officials face penalties." },
            { title: "Assam Moslem Marriages and Divorces Registration Act (Repealed)", description: "Recently repealed to discourage child marriage and move towards a uniform registration system for all marriages." },
            { title: "Assam Official Language Act", description: "Designates Assamese as the official language for all official purposes in the state, promoting the local language." }
        ]
    },
    {
        name: "Bihar",
        type: "State",
        laws: [
            { title: "Bihar Prohibition and Excise Act, 2016", description: "Enforces a complete ban on the manufacture, sale, and consumption of alcohol, making Bihar a 'Dry State' with strict penalties for violations." },
            { title: "Bihar Right to Public Grievance Redressal Act", description: "Gives citizens the legal right to have their complaints against government officials heard and resolved within a specific time frame." },
            { title: "Bihar Land Reforms Act", description: "A landmark law that abolished the Zamindari system to redistribute land ownership and protect the rights of actual tillers." },
            { title: "Bihar Privileged Persons Homestead Tenancy Act", description: "Provides permanent homestead land rights to landless laborers and poor families, preventing their eviction from their dwelling sites." },
            { title: "Bihar Money Lenders Act", description: "Regulates money lending businesses to prevent them from charging exorbitant interest rates and exploiting vulnerable borrowers." },
            { title: "Bihar Special Courts Act", description: "Establishes special courts to speed up the trial of corruption cases and allows for the confiscation of property acquired through corrupt means." },
            { title: "Bihar Panchayat Raj Act", description: "Governs rural local bodies, notably providing 50% reservation for women in Panchayat elections to empower them politically." },
            { title: "Bihar State Universities Act", description: "Regulates the administration and functioning of state universities to ensure academic standards and proper management." },
            { title: "Bihar Apartment Ownership Act", description: "Provides clear legal title and ownership rights to individual apartment owners in multi-story buildings." },
            { title: "Bihar Settlement of Taxation Disputes Act", description: "Offers a mechanism for businesses and individuals to settle old, pending tax disputes with the government amicably." }
        ]
    },
    {
        name: "Chhattisgarh",
        type: "State",
        laws: [
            { title: "Tonhi Pratadna Nivaran Act", description: "A strict law to combat superstition, punishing anyone who identifies, harasses, or harms a woman by branding her a 'Tonhi' (witch)." },
            { title: "Chhattisgarh Agricultural Cattle Preservation Act", description: "Prohibits the slaughter of agricultural cattle like cows and bullocks to preserve them for farming and dairy purposes." },
            { title: "PESA Rules (Chhattisgarh)", description: "Empowers Gram Sabhas in tribal areas to manage their own natural resources, resolve disputes, and preserve their customs." },
            { title: "Chhattisgarh Land Revenue Code", description: "The comprehensive law governing land ownership, tenancy rights, and the collection of land revenue in the state." },
            { title: "Chhattisgarh Rent Control Act", description: "Regulates the relationship between landlords and tenants in urban areas, covering rent fixation and eviction rules." },
            { title: "Chhattisgarh Special Public Safety Act", description: "Provides special powers to security forces to tackle Naxalism and other unlawful activities threatening public safety." },
            { title: "Chhattisgarh Food Security Act", description: "Guarantees access to affordable food grains for the poor, ensuring no one in the state goes hungry." },
            { title: "Chhattisgarh Lok Aayog Act", description: "Establishes an anti-corruption ombudsman (Lok Aayog) to investigate complaints of corruption against public servants." },
            { title: "Chhattisgarh Protection of Depositors Interest Act", description: "Protects small investors from fraudulent financial schemes (chit funds) by allowing the seizure of the fraudster's assets." },
            { title: "Chhattisgarh Excise Act", description: "Regulates the production, transport, and sale of alcohol and other intoxicants to control their supply and generate revenue." }
        ]
    },
    {
        name: "Goa",
        type: "State",
        laws: [
            { title: "Goa Civil Code (Uniform Civil Code)", description: "A unique set of civil laws applying to all Goans regardless of religion, governing marriage, divorce, and inheritance uniformly." },
            { title: "Goa Public Gambling Act", description: "The law that permits and regulates casinos (both onshore and offshore) and other gambling activities in specific zones." },
            { title: "Goa Change of Name and Surname Act", description: "Sets strict procedures for changing one's name to prevent identity fraud and protect the rights of native Goans." },
            { title: "Goa Daman and Diu Mundkars (Protection from Eviction) Act", description: "Protects 'Mundkars' (traditional dwellers living on others' land) from being evicted and gives them the right to purchase their dwelling house." },
            { title: "Goa Tourist Places (Protection and Maintenance) Act", description: "Bans nuisance activities like cooking, drinking, or littering in open tourist areas to maintain cleanliness and order." },
            { title: "Goa Agricultural Tenancy Act", description: "Protects the rights of agricultural tenants (tillers), making it difficult for landlords to evict them or sell the land without their consent." },
            { title: "Goa Right to Information Act", description: "Ensures transparency in government functioning by allowing citizens to request and receive information from public authorities." },
            { title: "Goa Children's Act", description: "A comprehensive law to protect children from abuse, trafficking, and exploitation, with a focus on the tourism industry." },
            { title: "Goa Non-Biodegradable Garbage (Control) Act", description: "Prohibits the throwing of plastic and other non-biodegradable waste in public places to protect Goa's environment." },
            { title: "Goa Succession, Special Notaries and Inventory Proceeding Act", description: "Governs the unique Portuguese-era system of inheritance and property division, ensuring equal share for spouses and children." }
        ]
    },
    {
        name: "Gujarat",
        type: "State",
        laws: [
            { title: "Gujarat Prohibition Act", description: "Strictly bans the manufacture, sale, and consumption of alcohol across the state, with permits only for visitors and health reasons." },
            { title: "Gujarat Disturbed Areas Act", description: "Prevents distress sale of property in sensitive areas by requiring government approval for property transfers between different religious communities." },
            { title: "Gujarat Control of Terrorism and Organised Crime Act (GCTOC)", description: "Gives police special powers, such as intercepting communications, to effectively combat terrorism and organized crime syndicates." },
            { title: "Gujarat Land Grabbing (Prohibition) Act", description: "Imposes heavy penalties and imprisonment for illegal land grabbing and establishes special courts for fast-track trials." },
            { title: "Gujarat Freedom of Religion Act", description: "Mandates prior permission from the district magistrate for religious conversions to prevent forced or fraudulent conversions." },
            { title: "Gujarat Prevention of Anti-Social Activities Act (PASA)", description: "Allows for the preventive detention of bootleggers, dangerous persons, and drug offenders to maintain public order." },
            { title: "Gujarat Animal Preservation Act", description: "Enforces a total ban on the slaughter of cows and their progeny, along with strict punishment for transporting beef." },
            { title: "Gujarat Town Planning and Urban Development Act", description: "Regulates how cities expand, ensuring planned development of infrastructure, housing, and commercial zones." },
            { title: "Gujarat Special Investment Region Act", description: "Facilitates the creation of large-scale industrial regions (SIRs) with world-class infrastructure to attract global investment." },
            { title: "Gujarat Public Trusts Act", description: "Regulates the management and administration of public religious and charitable trusts to ensure funds are used correctly." }
        ]
    },
    {
        name: "Haryana",
        type: "State",
        laws: [
            { title: "Haryana State Employment of Local Candidates Act", description: "Mandates 75% reservation in private sector jobs (up to a certain salary) for local residents of Haryana." },
            { title: "Haryana Gauvansh Sanrakshan and Gausamvardhan Act", description: "One of the strictest cow protection laws, prohibiting cow slaughter and the sale or consumption of beef." },
            { title: "Haryana Urban Control of Rent and Eviction Act", description: "Protects tenants from arbitrary rent hikes and eviction while outlining the rights of landlords in urban areas." },
            { title: "Haryana Prevention of Unlawful Conversion of Religion Act", description: "Prohibits religious conversion for the sake of marriage or through force, ensuring conversions are voluntary." },
            { title: "Haryana Panchayati Raj Act (Amendment)", description: "Sets minimum educational qualifications and other criteria (like having a functional toilet) for candidates contesting Panchayat elections." },
            { title: "Haryana Sports Council Act", description: "Establishes a council to promote sports, manage infrastructure, and ensure welfare schemes for athletes reach them." },
            { title: "Haryana Right to Service Act", description: "Empowers citizens to demand time-bound delivery of government services and penalizes officials for delays." },
            { title: "Haryana Development and Regulation of Urban Areas Act", description: "Controls the development of colonies and prevents the growth of illegal, unplanned urban settlements." },
            { title: "Haryana Ceiling on Land Holdings Act", description: "Fixes the maximum amount of agricultural land a family can own to prevent concentration of land wealth." },
            { title: "Haryana Sikh Gurdwaras (Management) Act", description: "Creates a separate committee to manage the affairs of Sikh Gurdwaras within Haryana, independent of the SGPC." }
        ]
    },
    {
        name: "Himachal Pradesh",
        type: "State",
        laws: [
            { title: "Section 118, HP Tenancy and Land Reforms Act", description: "Prevents non-agriculturists (including outsiders) from buying agricultural land in Himachal to protect local land ownership." },
            { title: "HP Public Service Guarantee Act", description: "Ensures that government officials provide essential services (like ration cards, certificates) within a fixed time." },
            { title: "Anti-Littering and Plastic Waste Laws", description: "Imposes strict fines on littering and the use of non-biodegradable plastic, especially in tourist destinations." },
            { title: "Himachal Pradesh Freedom of Religion Act", description: "Bans forced conversions and requires anyone wishing to convert to give prior notice to the district authorities." },
            { title: "Himachal Pradesh Tourism Development and Registration Act", description: "Mandates the registration of all hotels, homestays, and travel agents to ensure quality standards for tourists." },
            { title: "Himachal Pradesh Fruit Nurseries Registration Act", description: "Regulates the quality of fruit plants sold by nurseries to protect the state's vital horticulture industry." },
            { title: "Himachal Pradesh Fisheries Act", description: "Regulates fishing activities in rivers and reservoirs to conserve fish stocks and prevent illegal fishing methods." },
            { title: "Himachal Pradesh Courts Act", description: "Defines the jurisdiction and powers of civil courts in the state to ensure the administration of justice." },
            { title: "Himachal Pradesh Village Common Lands Vesting and Utilization Act", description: "Manages 'Shamlat' (common) lands, ensuring they are used for the benefit of the village community." },
            { title: "Himachal Pradesh Lokayukta Act", description: "Provides for an independent authority to investigate corruption allegations against public functionaries." }
        ]
    },
    {
        name: "Jharkhand",
        type: "State",
        laws: [
            { title: "Chota Nagpur Tenancy Act (CNT)", description: "A protective law that prohibits the transfer of tribal land to non-tribals in the Chota Nagpur region to preserve indigenous rights." },
            { title: "Santhal Pargana Tenancy Act (SPT)", description: "Similar to the CNT Act, this strictly protects the land rights of tribals in the Santhal Pargana division." },
            { title: "Jharkhand Freedom of Religion Act", description: "Criminalizes forced religious conversions and requires permission for voluntary conversions to prevent exploitation." },
            { title: "Jharkhand Bovine Animal Prohibition of Slaughter Act", description: "Bans the slaughter of cows and buffaloes and regulates the transport of cattle to prevent illegal smuggling." },
            { title: "Jharkhand State Employment of Local Candidates Act", description: "Reserves 75% of private sector jobs with a salary up to ₹40,000 for local candidates of Jharkhand." },
            { title: "Jharkhand Mineral Bearing Lands (Cess) Act", description: "Allows the state to collect a tax (cess) on mining activities to generate revenue for development." },
            { title: "Jharkhand Education Tribunal Act", description: "Sets up a tribunal to resolve disputes regarding teachers' service conditions and management of educational institutions." },
            { title: "Jharkhand Panchayat Raj Act", description: "Establishes the three-tier system of rural local governance with provisions for tribal representation (PESA)." },
            { title: "Jharkhand Municipal Act", description: "Governs the administration of urban local bodies like Municipal Corporations and Nagar Panchayats." },
            { title: "Jharkhand Public Services Guarantee Act", description: "Mandates that government services be delivered to citizens within a stipulated time limit." }
        ]
    },
    {
        name: "Karnataka",
        type: "State",
        laws: [
            { title: "Karnataka Prevention of Slaughter and Preservation of Cattle Act", description: "Imposes a near-total ban on the slaughter of cattle and severe penalties for smuggling or mistreating them." },
            { title: "Karnataka Land Reforms Act", description: "Recently amended to allow non-agriculturists to buy agricultural land, aiming to boost investment in farming." },
            { title: "Karnataka Police Act (Amendment)", description: "Sought to ban all forms of online gambling and betting involving money to protect youth (subject to court orders)." },
            { title: "Karnataka Protection of Right to Freedom of Religion Act", description: "Prohibits unlawful religious conversions by misrepresentation, force, undue influence, coercion, or allurement." },
            { title: "Karnataka Sakaala Services Act", description: "Guarantees the delivery of over 1,000 government services within a fixed time, with fines for officials who delay." },
            { title: "Karnataka Tree Preservation Act", description: "Regulates the felling of trees in both urban and rural areas to preserve the state's green cover." },
            { title: "Karnataka Industrial Employment (Standing Orders) Rules", description: "Mandates priority for Kannadigas (locals) in lower-level jobs in the private sector to ensure local employment." },
            { title: "Karnataka Education Act", description: "Regulates the establishment and management of schools and colleges, including fee structures and safety norms." },
            { title: "Karnataka Souharda Sahakari Act", description: "A unique law promoting 'Souharda' (harmony) cooperatives that have more autonomy than traditional cooperative societies." },
            { title: "Karnataka Lokayukta Act", description: "Establishes a powerful anti-corruption ombudsman with the authority to investigate and prosecute public servants." }
        ]
    },
    {
        name: "Kerala",
        type: "State",
        laws: [
            { title: "Kerala Shops and Commercial Establishments Act ('Right to Sit')", description: "Legally mandates that shop employees must be provided with chairs to sit, preventing them from standing all day." },
            { title: "Kerala Right to Service Act", description: "Ensures that citizens receive government services (like certificates) within a fixed time frame." },
            { title: "Kerala Regulation of Hartals Bill", description: "Regulates strikes (hartals) to ensure they don't disrupt public life, requiring prior notice and banning violence." },
            { title: "Kerala Land Reforms Act", description: "A revolutionary law that abolished the landlord system, giving ownership rights to the tenants who tilled the land." },
            { title: "Kerala Paddy Land and Wetland Conservation Act", description: "Strictly prohibits the conversion of paddy fields and wetlands into residential or commercial land to protect the environment." },
            { title: "Kerala Police Act (Section 118A - Struck down)", description: "An attempt to curb cyberbullying that was struck down for being too vague, but highlights the state's focus on digital safety." },
            { title: "Kerala Healthcare Service Persons and Healthcare Service Institutions Act", description: "Imposes harsh non-bailable penalties for attacking doctors, nurses, or damaging hospital property." },
            { title: "Kerala Lok Ayukta Act", description: "Empowers an independent body to investigate complaints of corruption and maladministration against public officials." },
            { title: "Kerala Women's Commission Act", description: "Creates a commission with the power to inquire into unfair practices affecting women and recommend actions." },
            { title: "Kerala Captive Elephants (Management and Maintenance) Rules", description: "Sets strict guidelines for the care, feeding, and workload of captive elephants used in festivals and temples." }
        ]
    },
    {
        name: "Madhya Pradesh",
        type: "State",
        laws: [
            { title: "MP Freedom of Religion Act", description: "Strictly prohibits religious conversion by force, fraud, or marriage, requiring prior notification to the district magistrate." },
            { title: "MP Public Services Guarantee Act", description: "The first law in India to legally guarantee the time-bound delivery of public services to citizens." },
            { title: "MP Prevention of Damage to Public and Private Property Act", description: "Allows the government to recover the cost of property damaged during riots or protests directly from the perpetrators." },
            { title: "MP Gangsters and Anti-Social Activities (Prevention) Act", description: "Gives police special powers to act against organized crime gangs and seize their illegal properties." },
            { title: "MP Govansh Vadh Pratishedh Adhiniyam", description: "Imposes a strict ban on cow slaughter and severe punishment for transporting cattle for slaughter." },
            { title: "MP Land Revenue Code", description: "The primary code governing land rights, agricultural tenancy, and revenue administration in the state." },
            { title: "MP Money Lenders Act", description: "Regulates private money lending to protect farmers and tribals from predatory interest rates and debt bondage." },
            { title: "MP Special Courts Act", description: "Establishes special courts to ensure the speedy trial of specific offenses, often related to corruption." },
            { title: "MP Peasant's Debt Relief Act", description: "Provides legal mechanisms to relieve distressed farmers from excessive debt burdens." },
            { title: "MP Lokayukta and Up-Lokayukta Act", description: "Sets up an independent anti-corruption body to investigate complaints against ministers and public servants." }
        ]
    },
    {
        name: "Maharashtra",
        type: "State",
        laws: [
            { title: "Maharashtra Control of Organised Crime Act (MCOCA)", description: "A tough law designed to combat organized crime and terrorism, allowing for stricter bail conditions and admissibility of confessions." },
            { title: "Maharashtra Rent Control Act", description: "Protects tenants from unfair eviction and excessive rent increases, especially in old buildings (Pagdi system)." },
            { title: "Maharashtra Regional and Town Planning Act (MRTP)", description: "Regulates land use, zoning, and development plans in cities to ensure orderly urban growth." },
            { title: "Maharashtra Protection of Interest of Depositors Act (MPID)", description: "Empowers the government to seize assets of fraudulent financial schemes to refund small investors." },
            { title: "Maharashtra Prevention and Eradication of Human Sacrifice and other Inhuman, Evil and Aghori Practices and Black Magic Act", description: "Criminalizes black magic, human sacrifice, and other superstitious practices that exploit people." },
            { title: "Maharashtra Animal Preservation Act", description: "Bans the slaughter of cows, bulls, and bullocks, and prohibits the possession of beef derived from them." },
            { title: "Maharashtra Casino (Control and Tax) Act", description: "A law that exists to regulate casinos, though currently, only Sikkim and Goa have operational casinos under similar laws." },
            { title: "Maharashtra Right to Public Services Act", description: "Mandates that government services be provided within a stipulated time, enhancing accountability." },
            { title: "Maharashtra Slum Areas (Improvement, Clearance and Redevelopment) Act", description: "Provides the legal framework for slum rehabilitation projects (SRA), giving slum dwellers free housing." },
            { title: "Maharashtra Police Act", description: "Governs the administration of the state police force and maintenance of public order, including powers to ban processions." }
        ]
    },
    {
        name: "Manipur",
        type: "State",
        laws: [
            { title: "Inner Line Permit (ILP)", description: "Requires non-natives to obtain a travel permit to enter Manipur, protecting the indigenous population's interests." },
            { title: "Manipur People’s Protection Bill", description: "Seeks to define 'Manipur people' and regulate the entry and settlement of non-locals in the state." },
            { title: "AFSPA (Disturbed Areas)", description: "Grants special powers to the armed forces in 'disturbed areas' to maintain public order, often a subject of debate." },
            { title: "Manipur Liquor Prohibition Act", description: "Originally a dry state, this law was recently amended to allow the sale and brewing of liquor in specific areas." },
            { title: "Manipur Land Revenue and Land Reforms Act", description: "Regulates land ownership, notably restricting the transfer of land in hill areas to non-tribals." },
            { title: "Manipur Control of Use and Play of Loudspeakers Act", description: "Regulates the use of loudspeakers to prevent noise pollution, especially during night hours." },
            { title: "Manipur Private School (Registration and Regulation) Act", description: "Regulates the functioning, fees, and standards of private schools in the state." },
            { title: "Manipur Tourism Policy", description: "Provides guidelines and incentives for the development of sustainable tourism in the state." },
            { title: "Manipur State Commission for Women Act", description: "Establishes a commission to safeguard the rights and interests of women in Manipur." },
            { title: "Manipur Lokayukta Act", description: "Sets up an anti-corruption ombudsman to investigate grievances against public functionaries." }
        ]
    },
    {
        name: "Meghalaya",
        type: "State",
        laws: [
            { title: "Meghalaya Transfer of Land (Regulation) Act", description: "Strictly prohibits the transfer of land from tribal to non-tribal people to preserve indigenous land ownership." },
            { title: "Meghalaya Residents Safety and Security Act", description: "Mandates the registration of all tenants and visitors to ensure the safety and security of local residents." },
            { title: "Matrilineal Inheritance Custom", description: "Recognizes the unique Khasi, Jaintia, and Garo custom where lineage and property inheritance pass through the youngest daughter." },
            { title: "Meghalaya Mines and Minerals Policy", description: "Regulates mining activities, specifically addressing the traditional but hazardous 'rat-hole' coal mining." },
            { title: "Meghalaya Forest Regulation", description: "Protects the state's forests and sacred groves, which are vital to the local culture and environment." },
            { title: "Meghalaya State Language Act", description: "Defines the official languages of the state for administrative and educational purposes." },
            { title: "Meghalaya Preventive Detention Act", description: "Allows for the detention of individuals to prevent them from acting in a manner prejudicial to public order." },
            { title: "Meghalaya Lokayukta Act", description: "Provides for an independent body to inquire into allegations of corruption against public servants." },
            { title: "Meghalaya Building Bye-Laws", description: "Regulates construction standards to ensure buildings are safe, especially given the region's seismic activity." },
            { title: "Meghalaya Victim Compensation Scheme", description: "Provides financial compensation and support to victims of crimes, particularly women and children." }
        ]
    },
    {
        name: "Mizoram",
        type: "State",
        laws: [
            { title: "Inner Line Permit (ILP)", description: "A mandatory permit for all visitors (domestic and foreign) to enter Mizoram, protecting local tribal identity." },
            { title: "Mizo Marriage, Divorce and Inheritance of Property Act", description: "Codifies the customary laws of the Mizo people regarding marriage, divorce, and property rights." },
            { title: "Mizoram Liquor (Prohibition) Act", description: "Enforces a strict ban on the sale and consumption of alcohol, making Mizoram a dry state." },
            { title: "Mizoram Maintenance of Household Registers Bill", description: "Mandates the maintenance of registers to identify genuine residents and detect illegal immigrants." },
            { title: "Mizoram Animal (Control and Taxation) Act", description: "Regulates the rearing of animals in urban areas to maintain hygiene and prevent public nuisance." },
            { title: "Mizoram Drug (Control) Act", description: "Provides strict measures to combat drug abuse and trafficking, a significant issue in the region." },
            { title: "Mizoram Urban and Regional Development Act", description: "Governs town planning and development to ensure organized growth of urban areas." },
            { title: "Mizoram Right to Public Services Act", description: "Ensures that citizens receive notified government services within a specific time frame." },
            { title: "Mizoram Organic Farming Act", description: "Promotes and regulates organic farming practices to make Mizoram an organic hub." },
            { title: "Mizoram Fisheries Act", description: "Regulates fishing to conserve aquatic resources and promote sustainable fisheries." }
        ]
    },
    {
        name: "Nagaland",
        type: "State",
        laws: [
            { title: "Article 371A", description: "A special constitutional provision ensuring that no Indian law regarding Naga religious/social practices or land ownership applies unless the Nagaland Assembly agrees." },
            { title: "Nagaland Total Liquor Prohibition Act", description: "Imposes a total ban on the import, transport, sale, and consumption of liquor in the state." },
            { title: "Inner Line Permit (ILP)", description: "Requires non-residents to obtain a permit to enter Nagaland, safeguarding the indigenous population." },
            { title: "Nagaland Communitisation of Public Institutions and Services Act", description: "A unique law that hands over the management of schools, health centers, and electricity to local communities." },
            { title: "Nagaland Village Council Act", description: "Empowers Village Councils with legal authority to administer local justice and manage village development." },
            { title: "Nagaland Land and Revenue Regulation", description: "Governs land revenue and ownership, reinforcing the protection of Naga land rights." },
            { title: "Nagaland Retirement from Public Employment Act", description: "Regulates the retirement age and tenure of government employees in the state." },
            { title: "Nagaland State Commission for Women Act", description: "Establishes a body to protect women's rights and address issues like domestic violence and discrimination." },
            { title: "Nagaland Lokayukta Act", description: "Sets up an anti-corruption ombudsman to investigate public functionaries." },
            { title: "Nagaland Health Care Establishments Act", description: "Regulates private hospitals and nursing homes to ensure they meet minimum standards of care." }
        ]
    },
    {
        name: "Odisha",
        type: "State",
        laws: [
            { title: "Odisha Prevention of Witch Hunting Act", description: "Criminalizes the practice of witch-hunting and provides protection and rehabilitation for victims." },
            { title: "Odisha Right to Public Services Act", description: "Guarantees the delivery of government services within a fixed time, penalizing officials for delays." },
            { title: "Odisha Land Rights to Slum Dwellers Act", description: "A pioneering law that grants land titles and property rights to slum dwellers in urban areas." },
            { title: "Odisha Freedom of Religion Act", description: "Regulates religious conversions, requiring a report to the District Magistrate to ensure they are voluntary." },
            { title: "Odisha Special Courts Act", description: "Establishes special courts to confiscate the property of public servants convicted of corruption." },
            { title: "Odisha Grama Panchayats Act", description: "Governs the functioning of Gram Panchayats, the foundation of rural local self-government." },
            { title: "Odisha Hindu Religious Endowments Act", description: "Manages the administration and finances of Hindu temples and religious institutions in the state." },
            { title: "Odisha Protection of Interests of Depositors Act", description: "Protects small investors from fraudulent financial establishments (chit funds) and allows asset seizure." },
            { title: "Odisha Lokayukta Act", description: "Provides for an independent body to investigate corruption charges against public officials." },
            { title: "Odisha Disaster Management Rules", description: "Specific regulations to manage and mitigate the impact of frequent cyclones and natural disasters." }
        ]
    },
    {
        name: "Punjab",
        type: "State",
        laws: [
            { title: "Punjab Preservation of Subsoil Water Act", description: "Prohibits farmers from sowing paddy before a specific date to prevent the depletion of groundwater." },
            { title: "Punjab Travel Professionals Regulation Act", description: "Regulates travel agents and consultants to prevent human trafficking and fraud in overseas employment." },
            { title: "Punjab Village Common Lands (Regulation) Act", description: "Manages 'Shamlat' (common) lands in villages, ensuring they are used for the community's benefit." },
            { title: "Punjab Excise Act", description: "Regulates the production and sale of liquor, a major source of state revenue, and controls illicit distillation." },
            { title: "Punjab Contract Farming Act", description: "Provides a legal framework for contract farming agreements between farmers and buyers to protect both parties." },
            { title: "Punjab Forfeiture of Illegally Acquired Property Act", description: "Allows the government to seize property acquired through drug trafficking to combat the drug menace." },
            { title: "Punjab Prevention of Human Smuggling Act", description: "Specifically targets illegal immigration agents ('kabootarbaazi') to protect youth from exploitation." },
            { title: "Punjab Right to Service Act", description: "Empowers citizens to get time-bound delivery of services like driving licenses and birth certificates." },
            { title: "Punjab Police Act", description: "Governs the state police force, defining its powers, duties, and accountability mechanisms." },
            { title: "Punjab Apartment and Property Regulation Act", description: "Regulates the construction and sale of apartments and colonies to protect homebuyers from fraud." }
        ]
    },
    {
        name: "Rajasthan",
        type: "State",
        laws: [
            { title: "Rajasthan Right to Health Act", description: "The first law in India to guarantee residents the right to emergency treatment and care without prepayment." },
            { title: "Rajasthan Guaranteed Delivery of Public Services Act", description: "Ensures that citizens receive government services on time and imposes penalties on officials for delays." },
            { title: "Rajasthan Rent Control Act", description: "Regulates the rental market, protecting tenants from arbitrary eviction while ensuring fair rent for landlords." },
            { title: "Rajasthan Minimum Guaranteed Income Bill", description: "A landmark bill guaranteeing a minimum income or employment for the entire adult population of the state." },
            { title: "Rajasthan Platform Based Gig Workers (Registration and Welfare) Act", description: "Provides social security and welfare benefits to gig workers (like delivery partners) employed by apps." },
            { title: "Rajasthan Prevention of Mrityu Bhoj Act", description: "Prohibits the custom of holding death feasts ('Mrityu Bhoj'), which often forces families into debt." },
            { title: "Rajasthan Bovine Animal (Prohibition of Slaughter and Regulation of Temporary Migration or Export) Act", description: "Strictly prohibits the slaughter of cows and regulates their transport to protect the state's cattle wealth." },
            { title: "Rajasthan Epidemic Diseases Act", description: "Grants the government special powers to take necessary measures to control the spread of epidemic diseases." },
            { title: "Rajasthan Tourism Trade (Facilitation and Regulation) Act", description: "Regulates the tourism industry to prevent the harassment of tourists and ensure quality services." },
            { title: "Rajasthan Hearing of Right to Act", description: "Guarantees citizens the right to a hearing for their grievances and ensures they receive a reasoned response." }
        ]
    },
    {
        name: "Sikkim",
        type: "State",
        laws: [
            { title: "Article 371F", description: "A constitutional provision that protects the pre-merger laws of Sikkim and safeguards the rights of the Sikkimese people." },
            { title: "Sikkim Anti-Drugs Act (SADA)", description: "One of the toughest anti-drug laws, aiming to eradicate drug abuse and trafficking in the state." },
            { title: "Sikkim Registration of Companies Act", description: "Allows companies to be registered specifically in Sikkim, governed by state-level regulations." },
            { title: "Sikkim Succession Act", description: "Governs the inheritance and succession of property among the Sikkimese people, respecting local customs." },
            { title: "Sikkim Public Services Guarantee Act", description: "Ensures the timely delivery of government services to citizens to improve administrative efficiency." },
            { title: "Sikkim Organic Farming Mission", description: "The policy framework that made Sikkim the world's first fully organic state, banning chemical fertilizers." },
            { title: "Sikkim Forests, Water Courses and Road Reserve (Preservation and Protection) Act", description: "Protects the state's rich biodiversity, water bodies, and road reserves from encroachment and damage." },
            { title: "Sikkim Labour (Regulation of Employment and Conditions of Service) Act", description: "Regulates the employment conditions, wages, and welfare of workers in the state." },
            { title: "Sikkim Allotment of House Sites and Construction of Building (Regulation and Control) Act", description: "Regulates the allotment of land for housing and controls building construction standards." },
            { title: "Sikkim Panchayat Act", description: "Governs the rural local self-government institutions, ensuring local participation in development." }
        ]
    },
    {
        name: "Tamil Nadu",
        type: "State",
        laws: [
            { title: "TN Regulation of Jallikattu Act", description: "Legally permits and regulates the traditional bull-taming sport 'Jallikattu' while ensuring safety norms." },
            { title: "TN Hindu Religious and Charitable Endowments Act", description: "Empowers the government to manage and administer the state's vast number of Hindu temples and their assets." },
            { title: "TN Prohibition of Harassment of Woman Act", description: "Specifically targets 'eve-teasing' and harassment of women in public places, educational institutions, etc." },
            { title: "TN Prohibition of Online Gambling and Regulation of Online Games Act", description: "Bans online gambling and games of chance like Rummy and Poker to prevent financial loss and addiction." },
            { title: "TN Public Property (Prevention of Damage and Loss) Act", description: "Imposes strict penalties for damaging public property (like buses) during protests or strikes." },
            { title: "TN Goondas Act", description: "Allows for the preventive detention of habitual offenders, bootleggers, and other 'dangerous persons' for up to a year." },
            { title: "TN Temple Entry Authorization Act", description: "Ensures that all Hindus, regardless of caste, have the right to enter and worship in temples." },
            { title: "TN Apartment Ownership Act", description: "Regulates the ownership, transfer, and management of apartments in multi-story buildings." },
            { title: "TN Transparency in Tenders Act", description: "Mandates transparency in government procurement and tender processes to prevent corruption." },
            { title: "TN Right to Information Act", description: "The state's specific rules for implementing the Right to Information, enabling citizen access to government data." }
        ]
    },
    {
        name: "Telangana",
        type: "State",
        laws: [
            { title: "TS-bPASS Act", description: "A single-window system giving instant building permissions for certain plot sizes based on self-certification." },
            { title: "Telangana Land Encroachment Act", description: "Provides strict measures to prevent the encroachment of government land and remove illegal occupants." },
            { title: "Telangana Dalit Bandhu", description: "A scheme backed by policy that provides a one-time grant of ₹10 lakh to Dalit families for entrepreneurship." },
            { title: "Telangana Rights in Land and Pattadar Pass Books Act", description: "Provides the legal basis for the 'Dharani' portal, streamlining land registration and records management." },
            { title: "Telangana Preventive Detention Act", description: "Allows the police to detain bootleggers, drug offenders, and land grabbers to prevent them from committing crimes." },
            { title: "Telangana Gaming Act", description: "Bans all forms of online gaming and gambling within the state to protect residents from financial harm." },
            { title: "Telangana Municipalities Act", description: "Governs urban local bodies, featuring strict provisions for the demolition of illegal structures." },
            { title: "Telangana Panchayat Raj Act", description: "Establishes the structure for rural governance, empowering Gram Panchayats and local representatives." },
            { title: "Telangana Cyber Security Policy", description: "A framework to protect the state's digital infrastructure and combat cybercrimes effectively." },
            { title: "Telangana Heritage (Protection, Preservation, Conservation and Maintenance) Act", description: "Protects historical monuments and heritage structures in the state from destruction and neglect." }
        ]
    },
    {
        name: "Tripura",
        type: "State",
        laws: [
            { title: "Tripura Land Revenue and Land Reforms Act", description: "Regulates land revenue and strictly protects the land rights of the indigenous tribal population." },
            { title: "Tripura Security Act", description: "Empowers the government to take special measures to maintain public order and security in the state." },
            { title: "Tripura Tribal Areas Autonomous District Council Act", description: "Grants autonomy to the District Council to administer tribal areas and protect tribal culture." },
            { title: "Tripura Police Act", description: "Regulates the state police force, defining its role in maintaining law and order." },
            { title: "Tripura Shops and Establishments Act", description: "Regulates the working conditions, hours, and holidays for employees in shops and commercial establishments." },
            { title: "Tripura Agricultural Indebtedness Relief Act", description: "Provides relief to farmers burdened by debt, preventing exploitation by money lenders." },
            { title: "Tripura Road Development Fund Act", description: "Establishes a fund specifically for the development and maintenance of roads in the state." },
            { title: "Tripura Professions, Trades, Callings and Employments Taxation Act", description: "Levies a tax on professions and trades to generate revenue for the state." },
            { title: "Tripura Guaranteed Services to Citizens Act", description: "Ensures that citizens receive essential government services within a stipulated time period." },
            { title: "Tripura Forest Act", description: "Governs the protection and management of forests and the transit of forest produce." }
        ]
    },
    {
        name: "Uttar Pradesh",
        type: "State",
        laws: [
            { title: "UP Prohibition of Unlawful Conversion of Religion Ordinance", description: "Makes religious conversion a non-bailable offense if done through force, fraud, or solely for marriage." },
            { title: "UP Control of Goonda Act", description: "Allows authorities to detain habitual criminals ('Goondas') preventively to maintain public peace." },
            { title: "UP Recovery of Damages to Public and Private Property Act", description: "Empowers the state to recover the cost of property damaged during riots directly from the protesters." },
            { title: "UP Gangsters and Anti-Social Activities (Prevention) Act", description: "A stringent law allowing the attachment of property acquired by gangsters through illegal means." },
            { title: "UP Revenue Code", description: "A comprehensive law consolidating all rules related to land revenue, tenancy, and land boundaries." },
            { title: "UP Prevention of Cow Slaughter Act", description: "Imposes a strict ban on cow slaughter and the sale of beef, with severe penalties for offenders." },
            { title: "UP Apartment (Promotion of Construction, Ownership and Maintenance) Act", description: "Protects the rights of apartment owners and regulates the promotion and maintenance of apartments." },
            { title: "UP Industrial Area Development Act", description: "Provides for the planned development of industrial areas like Noida and Greater Noida." },
            { title: "UP Urban Planning and Development Act", description: "Regulates the development of urban areas to ensure organized growth and infrastructure." },
            { title: "UP Special Security Force Act", description: "Constitutes a special force dedicated to the security of courts, airports, and other vital installations." }
        ]
    },
    {
        name: "Uttarakhand",
        type: "State",
        laws: [
            { title: "Uttarakhand Freedom of Religion Act", description: "Regulates religious conversions, prohibiting those done through force, allurement, or fraudulent means." },
            { title: "Uttarakhand Anti-Copying Act", description: "Imposes life imprisonment and heavy fines for those involved in paper leaks and cheating in recruitment exams." },
            { title: "Hill Area Land Laws", description: "Restricts outsiders from purchasing large amounts of agricultural land in the hill districts to protect local resources." },
            { title: "Uttarakhand Char Dham Devasthanam Management Act (Repealed)", description: "Was enacted to manage the Char Dham temples but was repealed; relevant for understanding temple management history." },
            { title: "Uttarakhand Police Act", description: "Governs the state police, outlining their powers and duties to ensure public safety and order." },
            { title: "Uttarakhand Right to Service Act", description: "Mandates the time-bound delivery of citizen services, holding officials accountable for delays." },
            { title: "Uttarakhand Tourism Policy", description: "Provides the legal and policy framework to promote sustainable tourism and regulate the industry." },
            { title: "Uttarakhand Panchayati Raj Act", description: "Governs rural local bodies, ensuring local representation and development in villages." },
            { title: "Uttarakhand River Valley (Development and Management) Act", description: "Regulates development activities in river valleys to prevent environmental degradation." },
            { title: "Uttarakhand Cow Protection Act", description: "Prohibits the slaughter of cows and ensures their protection and welfare in the state." }
        ]
    },
    {
        name: "West Bengal",
        type: "State",
        laws: [
            { title: "West Bengal Premises Tenancy Act", description: "Provides strong protection to tenants against eviction and regulates rent in Kolkata and other areas." },
            { title: "West Bengal Maintenance of Public Order Act", description: "Gives the government powers to impose restrictions to maintain public safety and prevent disorder." },
            { title: "Kanyashree Prakalpa", description: "A globally acclaimed scheme backed by policy to provide financial support to girls to prevent child marriage and encourage education." },
            { title: "West Bengal Land Reforms Act", description: "Famous for 'Operation Barga', it secured the rights of sharecroppers and redistributed land to the landless." },
            { title: "West Bengal Clinical Establishments (Registration, Regulation and Transparency) Act", description: "Regulates private hospitals, ensuring transparency in billing and preventing negligence." },
            { title: "West Bengal Fire Services Act", description: "Regulates fire safety measures in buildings and the functioning of the fire brigade." },
            { title: "West Bengal Apartment Ownership Act", description: "Provides for the ownership of individual apartments and the formation of associations to manage common areas." },
            { title: "West Bengal Trees (Protection and Conservation in Non-Forest Areas) Act", description: "Requires permission to fell trees even on private land to preserve the green cover." },
            { title: "West Bengal Inland Fisheries Act", description: "Regulates fishing in inland water bodies to conserve fish stocks and manage water resources." },
            { title: "West Bengal Right to Public Services Act", description: "Ensures that citizens receive government services within a specific time limit." }
        ]
    },
    {
        name: "Andaman and Nicobar Islands",
        type: "Union Territory",
        laws: [
            { title: "Protection of Aboriginal Tribes (Regulation)", description: "Strictly prohibits entry into tribal reserves to protect vulnerable indigenous tribes like the Jarawas and Sentinelese from outside contact." },
            { title: "Coastal Regulation Zone (CRZ) Norms", description: "Imposes strict restrictions on construction and industrial activities near the coast to protect the fragile island ecosystem." },
            { title: "Andaman and Nicobar Islands Fisheries Regulation", description: "Regulates fishing activities to prevent overfishing and protect marine biodiversity." },
            { title: "Andaman and Nicobar Islands Land Revenue and Land Reforms Regulation", description: "Governs land tenure, revenue collection, and land reforms in the islands." },
            { title: "Andaman and Nicobar Islands Marine Fishing Regulation", description: "Specifically manages marine fishing, requiring licenses for fishing vessels." },
            { title: "Andaman and Nicobar Islands Tourist Trade Regulation", description: "Regulates the tourism industry, ensuring safety standards and preventing the exploitation of tourists." },
            { title: "Islands Protection Zone Notification", description: "A special environmental notification regulating development activities to preserve the islands' unique ecology." },
            { title: "Andaman and Nicobar Islands Municipal Council Regulation", description: "Governs the administration of the Port Blair Municipal Council and other urban areas." },
            { title: "Andaman and Nicobar Islands Panchayat Regulation", description: "Establishes the Panchayati Raj system for rural governance in the islands." },
            { title: "Andaman and Nicobar Islands Excise Regulation", description: "Controls the import, manufacture, and sale of liquor in the Union Territory." }
        ]
    },
    {
        name: "Chandigarh",
        type: "Union Territory",
        laws: [
            { title: "Capital of Punjab (Development and Regulation) Act", description: "Strictly regulates construction and land use to maintain Le Corbusier's planned architectural character of the city." },
            { title: "Periphery Control Act", description: "Controls development in the areas surrounding Chandigarh to prevent haphazard urbanization." },
            { title: "Chandigarh Estate Rules", description: "Governs the sale, transfer, and lease of property in Chandigarh, which is largely leasehold." },
            { title: "Chandigarh Trees Preservation Order", description: "Prohibits the cutting or pruning of trees without strict permission to maintain the city's green cover." },
            { title: "Chandigarh Cycle Tracks Bye-laws", description: "Regulates the use of the city's extensive cycle tracks, ensuring safety for cyclists." },
            { title: "Chandigarh Advertisement Control Order", description: "Strictly regulates the placement of hoardings and advertisements to prevent visual pollution." },
            { title: "Chandigarh Municipal Corporation Act", description: "Governs the civic administration of the city, including sanitation, water supply, and roads." },
            { title: "Chandigarh Excise Policy", description: "Determines the rules for the sale of liquor and the allocation of vends in the UT." },
            { title: "Chandigarh Right to Service Act", description: "Ensures timely delivery of citizen services by the administration." },
            { title: "Punjab Reorganisation Act", description: "The central act that created Chandigarh as a UT and joint capital, defining its administrative status." }
        ]
    },
    {
        name: "Dadra and Nagar Haveli and Daman and Diu",
        type: "Union Territory",
        laws: [
            { title: "Goa, Daman and Diu Public Gambling Act", description: "Regulates gambling activities, prohibiting common gaming houses while allowing certain authorized games." },
            { title: "Daman and Diu Excise Duty Act", description: "Governs the levy of excise duty on alcohol, known for its lower tax rates compared to neighboring states." },
            { title: "Dadra and Nagar Haveli Land Reforms Regulation", description: "Protects the land rights of the indigenous tribal population and regulates land transfer." },
            { title: "Dadra and Nagar Haveli Excise Regulation", description: "Regulates the production and sale of liquor in the Dadra and Nagar Haveli region." },
            { title: "Daman and Diu Town and Country Planning Act", description: "Regulates urban planning and development to ensure organized growth in the coastal enclaves." },
            { title: "Dadra and Nagar Haveli Panchayat Regulation", description: "Establishes the system of rural local self-government in the UT." },
            { title: "Daman and Diu Municipalities Regulation", description: "Governs the administration of municipal councils in Daman and Diu." },
            { title: "Coastal Regulation Zone (CRZ) Notification", description: "Restricts development activities along the coastline to protect the marine environment." },
            { title: "Dadra and Nagar Haveli Value Added Tax Regulation", description: "Governs the taxation of goods sold within the territory." },
            { title: "Daman and Diu Marine Fishing Regulation", description: "Regulates fishing activities in the coastal waters to ensure sustainability." }
        ]
    },
    {
        name: "Delhi",
        type: "Union Territory",
        laws: [
            { title: "Delhi Rent Control Act", description: "Favoring tenants, this law severely restricts rent increases and makes eviction difficult in older properties." },
            { title: "Delhi Special Police Establishment Act", description: "The founding act of the CBI, defining its powers to investigate corruption and special crimes." },
            { title: "Delhi Preservation of Trees Act", description: "Makes it illegal to cut, damage, or prune any tree without permission from the Tree Officer." },
            { title: "Delhi Development Act", description: "Established the DDA to plan and develop Delhi, acquiring land for housing and infrastructure." },
            { title: "Delhi Municipal Corporation Act", description: "Governs the Municipal Corporation of Delhi (MCD), responsible for civic services like sanitation." },
            { title: "Delhi Excise Act", description: "Regulates the liquor trade in the capital, including the legal drinking age and licensing of vends." },
            { title: "Delhi School Education Act", description: "Regulates the functioning of public and private schools, including admission criteria and fees." },
            { title: "Delhi Fire Service Act", description: "Mandates fire safety standards for buildings and regulates the operations of the fire service." },
            { title: "Delhi Geo-spatial Data Infrastructure (Management Control to the Administration, Security and Safety) Act", description: "Regulates the creation and use of geo-spatial data (maps) of Delhi for security and planning." },
            { title: "National Capital Territory of Delhi Laws (Special Provisions) Act", description: "Periodically extends protection to unauthorized colonies and slums from demolition." }
        ]
    },
    {
        name: "Jammu and Kashmir",
        type: "Union Territory",
        laws: [
            { title: "J&K Public Safety Act (PSA)", description: "A stringent law allowing detention without trial for up to two years to prevent acts prejudicial to state security." },
            { title: "Domicile Rules", description: "Defines who is a 'domicile' of J&K, granting them exclusive rights to government jobs and land ownership." },
            { title: "J&K Reorganisation Act", description: "The historic act that reorganized the state into two Union Territories and applied central laws to the region." },
            { title: "J&K Panchayati Raj Act", description: "Establishes a three-tier local governance system, including the newly created District Development Councils (DDCs)." },
            { title: "J&K Land Revenue Act", description: "Recently amended to allow people from outside J&K to purchase non-agricultural land for development." },
            { title: "J&K Excise Act", description: "Regulates the import, export, and sale of liquor and intoxicating drugs in the UT." },
            { title: "J&K Shri Mata Vaishno Devi Shrine Act", description: "Provides for the administration and management of the holy shrine by a statutory board." },
            { title: "J&K Prevention of Corruption Act", description: "Laws to combat corruption in public office (now largely superseded by central laws but historically relevant)." },
            { title: "J&K Civic Laws (Special Provisions) Act", description: "Provides temporary relief from sealing or demolition for certain unauthorized constructions." },
            { title: "J&K Industrial Policy", description: "A policy framework to attract investment and promote industrial growth in the newly formed UT." }
        ]
    },
    {
        name: "Ladakh",
        type: "Union Territory",
        laws: [
            { title: "LAHDC Act", description: "Grants significant autonomy to the Ladakh Autonomous Hill Development Councils (Leh and Kargil) for local governance." },
            { title: "Inner Line Permit (ILP)", description: "Required for domestic and foreign tourists to visit certain protected areas near the border." },
            { title: "Ladakh Industrial Land Allotment Policy", description: "Regulates the allotment of land for industrial purposes, prioritizing local entrepreneurs." },
            { title: "Ladakh Police (Subordinate Service) Recruitment Rules", description: "Governs the recruitment and service conditions of the police force in the UT." },
            { title: "Ladakh Organic Agriculture Policy", description: "Promotes organic farming practices to preserve the fragile Himalayan ecosystem." },
            { title: "Ladakh Homestay Policy", description: "Encourages and regulates homestays to promote sustainable tourism and local livelihoods." },
            { title: "Wildlife Protection Act (Specific application)", description: "Strictly enforced to protect rare Himalayan fauna like the Snow Leopard and Black-necked Crane." },
            { title: "Ancient Monuments and Archaeological Sites and Remains Act", description: "Protects the region's ancient monasteries and historical sites." },
            { title: "Ladakh Food Security Rules", description: "Ensures the distribution of essential food grains to the population in this remote region." },
            { title: "Ladakh Renewable Energy Policy", description: "Promotes the development of solar and wind energy projects in the high-altitude desert." }
        ]
    },
    {
        name: "Lakshadweep",
        type: "Union Territory",
        laws: [
            { title: "Entry Permit Rules", description: "Strictly restricts entry; non-natives must obtain a permit to visit the islands to protect the local culture." },
            { title: "Lakshadweep Prohibition Regulation", description: "Enforces a total ban on the sale and consumption of alcohol, with exceptions only for certain tourist resorts." },
            { title: "Lakshadweep Panchayat Regulation", description: "Establishes the system of local self-government in the islands." },
            { title: "Lakshadweep Marine Fishing Regulation", description: "Regulates fishing activities to ensure sustainable use of marine resources." },
            { title: "Lakshadweep Development Corporation Regulation", description: "Governs the activities of the corporation responsible for the economic development of the islands." },
            { title: "Lakshadweep Town and Country Planning Regulation", description: "Regulates construction and land use to prevent overcrowding and environmental damage." },
            { title: "Lakshadweep Land Revenue and Tenancy Regulation", description: "Governs land ownership and tenancy rights in the territory." },
            { title: "Lakshadweep Cooperative Societies Regulation", description: "Promotes and regulates cooperative societies, which are vital for the island economy." },
            { title: "Lakshadweep Electricity Supply Regulation", description: "Manages the generation and distribution of electricity in the islands." },
            { title: "Lakshadweep Port Rules", description: "Regulates the management and operation of ports, the lifeline of the islands." }
        ]
    },
    {
        name: "Puducherry",
        type: "Union Territory",
        laws: [
            { title: "French Civil Code", description: "A unique legal legacy where certain French laws still apply to 'Renoncants' (locals who opted for French law)." },
            { title: "Puducherry Settlement Act", description: "Regulates the settlement of land revenue and taxation in the territory." },
            { title: "Puducherry Excise Act", description: "Regulates the liquor trade, known for lower taxes and promoting tourism." },
            { title: "Puducherry School Education Act", description: "Governs the administration and standards of schools in the UT." },
            { title: "Puducherry Town and Country Planning Act", description: "Regulates urban development and land use planning." },
            { title: "Puducherry Buildings (Lease and Rent Control) Act", description: "Regulates the rental market, protecting tenants and landlords." },
            { title: "Puducherry Prevention of Anti-Social Activities Act", description: "Allows for preventive detention to maintain public order." },
            { title: "Puducherry Marine Fishing Regulation Act", description: "Regulates fishing in coastal waters to protect marine life." },
            { title: "Puducherry Hindu Religious Institutions Act", description: "Manages the administration of Hindu temples and endowments." },
            { title: "Puducherry Industrial Promotion Policy", description: "Provides incentives to attract industries and generate employment." }
        ]
    }
].sort((a, b) => a.name.localeCompare(b.name));
