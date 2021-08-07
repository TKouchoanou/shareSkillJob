

export const jobs:any[]= [
  {
    id: 1,
    title: "Data-science eenginer Nice",
    salary: 3000,
    devise: "euro",
    skills: [
      "Mathématiques L3",
      "Statistics Master",
      "Computer science Master"
    ],
    field: "data science",
    level: "confirmed",
    type: "CDI : Contract of indefinite duration",
    company: "Alteca",
    adresse: "Nice",
    town: "Nice",
    contacts: { emails: [], phones: ["05-54-64-78"] },
    descriptionJob: "nice job for you",
    descriptionProfil: "motivate persons"
  },
  {
    id: 2,
    title: "Agriculture Economics resarcher Montpellier",
    salary: 1000,
    devise: "euro",
    skills: [
      "Agronomy Basic",
      "Mathématiques Secondary",
      "Statistics Master",
      "Econometric "
    ],
    level: "expert",
    type: "CDI : Contract of indefinite duration",
    field: "Economics",
    company: "INRA",
    adresse: "Montpellier",
    town: "Montpellier",
    contacts: { emails: ["redutf@rs.tk"], phones: [] },
    descriptionJob: "nice job for you",
    descriptionProfil: "motivate persons"
  },
  {
    id: 3,
    title: "Data Analyst Paris",
    salary: 2000,
    devise: "euro",
    skills: ["Mathématiques", "Logistic regression", "Python", "Data-mining"],
    level: "starter",
    type: "CDD: Fixed Term Contract",
    field: "statistic",
    company: "General Society Bank",
    adresse: "Paris",
    town: "Paris",
    contacts: { emails: ["tsre@ht.vr"], phones: [] },
    descriptionJob: "nice job for you",
    descriptionProfil: "motivate persons"
  },
  {
    id: 4,
    title: "Web Developper start up Lyon",
    salary: 3000,
    devise: "euro",
    skills: [
      "software engeneering",
      "Design patterns",
      "Data-base",
      "Symfony php",
      "Angular 11"
    ],
    level: "starter",
    type: "CDI : Contract of indefinite duration",
    field: " web",
    company: "Cap-gemini",
    adresse: "Lyon",
    town: "Lyon",
    contacts: { emails: ["uytrfop@ht.ft"], phones: ["54-67-90"] },
    descriptionJob: "nice job for you",
    descriptionProfil: "motivate persons"
  },
  {
    id: 5,
    title: "Data-science eenginer Nice",
    salary: 3000,
    devise: "euro",
    skills: [
      "Mathématiques L3",
      "Statistics Master",
      "Computer science Master"
    ],
    field: "data science",
    level: "confirmed",
    type: "CDD: Fixed Term Contract",
    company: "Alteca",
    adresse: "Nice",
    town: "Nice",
    contacts: { emails: ["zoomfrt.@reg.lk"], phones: [] },
    descriptionJob: "nice job for you",
    descriptionProfil: "motivate persons"
  },
  {
    id: 6,
    title: "Agriculture Economics resarcher Montpellier",
    salary: 2000,
    devise: "euro",
    skills: [
      "Agronomy Basic",
      "Mathématiques Secondary",
      "Statistics Master",
      "Econometric ",
      "English"
    ],
    level: "expert",
    field: "Economics",
    type: "Stand-in",
    company: "INRA",
    adresse: "Montpellier",
    town: "Montpellier",
    contacts: { emails: ["zok@hot.mail"], phones: [] },
    descriptionJob: "nice job for you",
    descriptionProfil: "motivate persons"
  },
  {
    id: 7,
    title: "Data Analyst Paris",
    salary: 2000,
    devise: "euro",
    skills: ["Mathématiques", "Logistic regression", "Python", "Data-mining"],
    level: "starter",
    type: "CDI : Contract of indefinite duration",
    field: "statistic",
    company: "General Society Bank",
    adresse: "Paris",
    town: "Paris",
    contacts: { emails: ["zfrese@gmail.com"], phones: [] },
    descriptionJob: "nice job for you",
    descriptionProfil: "motivate persons"
  },
  {
    id: 8,
    title: "Buisness Intelligence Developper Lyon ",
    salary: 2000,
    devise: "euro",
    skills: [
      "Agronomy Basic",
      "Mathématiques Secondary",
      "Statistics Master",
      "Econometric ",
      ""
    ],
    level: "expert",
    field: "Economics",
    type: "Stand-in",
    company: "Cape-gemini",
    adresse: "Lyon",
    town: "Lyon",
    contacts: { emails: ["titi@yahoo.fr"], phones: ["09-56-32-44"] },
    descriptionJob: "nice job for you",
    descriptionProfil: "motivate persons"
  },
  {
    id: 9,
    title: "Java Web developper",
    salary: 4000,
    devise: "euro",
    skills: [
      "Agronomy Basic",
      "Mathématiques Secondary",
      "Statistics Master",
      "Econometric "
    ],
    level: "expert",
    field: "Developper",
    type: "Free-lance",
    company: "Cape-gemini",
    adresse: "Nice",
    town: "Nice",
    contacts: { emails: ["zozor@gmail.com"], phones: [] },
    descriptionJob: "nice job for you",
    descriptionProfil: "motivate persons"
  },
  {
    id: 7,
    title: "Data Analyst Paris",
    salary: 2000,
    devise: "euro",
    skills: ["Mathématiques", "Logistic regression", "Python", "Data-mining"],
    level: "starter",
    type: "CDI : Contract of indefinite duration",
    field: "statistic",
    company: "General Society Bank",
    adresse: "Paris",
    town: "Paris",
    contacts: { emails: ["retdas@gmail.com"], phones: [] },
    descriptionJob: "nice job for you",
    descriptionProfil: "motivate persons"
  }
].map( (job)=> {
  // @ts-ignore
  job.skills = job.skills.map((skill) => {
    if (typeof skill === "string") {
      return {skill: skill, level: Math.random() * 100 * 6 + 2 > 300 ? 'stater' : 'confirmed'}
    }
    return skill;
  });
 let  date=new Date();
  let diff= date.getTime()-5*9000+Math.random()*12000;
  date=new Date(diff);
  job['pubDate']=date;
  return job;

} );
//pour chaque job on adapte le skill
