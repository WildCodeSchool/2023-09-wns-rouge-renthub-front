import { VariablesColors } from "@/styles/Variables.colors";
import Article from "./Article";

const articles = [
  {
    id: 1,
    title: "Location de matériel de sport et loisirs",
    image: "/images/article_1.png",
    content: [
      "RentHub, leader de la location de matériel de sport et loisirs, vous offre un vaste choix d'équipements pour toutes vos activités en extérieur ou en intérieur. Nous mettons à votre disposition la location de matériel pour une large gamme de sports et de loisirs : sports d'équipe, sports individuels, activités aquatiques, randonnées, camping, événements sportifs...text hidden",
      "En tant que spécialiste de la location d'équipements de loisirs, nous vous accompagnons dans la réalisation de vos projets sportifs ou de détente ainsi que dans toutes vos aventures avec du matériel de qualité pour diverses activités : cyclisme, ski, escalade, surf, kayak, football, basketball, camping, pêche... en vous garantissant que tout le matériel est vérifié et contrôlé avant chaque location.",
    ],
  },
  {
    id: 2,
    title: "Savoie Hivernale : Évasion Magique entre Neige, Aventure",
    image: "/images/article_2.png",
    content: [
      "La Savoie, véritable joyau hivernal, offre une multitude d'activités enchanteuses pour tous les amateurs de montagne. Imaginez-vous glissant sur les vastes étendues enneigées de ses domaines skiables réputés, où débutants et experts trouvent leur bonheur entre pistes vertes et noires vertigineuses.  Au-delà du ski, la Savoie invite à des escapades en raquettes à travers des forêts silencieuses, où la neige étincelle sous les rayons du soleil. Les plus aventureux pourront s'essayer au ski de randonnée ou au parapente hivernal, pour survoler des paysages à couper le souffle. ",
      "Sans oublier les moments de détente dans les spas et centres thermaux, où le bien-être se trouve au cœur de la montagne. ",
    ],
  },
];

function Articles() {
  const { color2 } = new VariablesColors();
  return articles.map((article, index) => (
    <Article
      key={article.id}
      article={article}
      {...(!(index % 2) && { bgColor: color2, odd: true })}
    />
  ));
}

export default Articles;
