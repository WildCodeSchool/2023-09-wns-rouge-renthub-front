interface Category {
  name: string;
  display?: boolean;
  id: string;
  index: number;
  parentCategory: ParentCategory | null;
  childCategories: Category[];
  picture?: Picture | null;
}

interface ParentCategory {
  name: string;
  id: string;
  index: number;
}

interface Picture {
  name: string;
}

export function sortCategories(categories: Category[]): Category[] {
  // Créer un dictionnaire des catégories par ID pour un accès facile
  const categoryDict: { [key: string]: Category } = {};
  categories.forEach((category) => {
    categoryDict[category.id] = category;
  });

  // Fonction récursive pour construire l'arbre des catégories
  function buildTree(category: Category): Category {
    if (category.childCategories && category.childCategories.length > 0) {
      category.childCategories = category.childCategories.map((child) =>
        buildTree(categoryDict[child.id]),
      );
    }
    return category;
  }

  // Trouver les catégories racines (celles qui n'ont pas de parent)
  const rootCategories = categories.filter(
    (category) => !category.parentCategory,
  );

  // Construire l'arbre des catégories à partir des racines
  return rootCategories.map((root) => buildTree(root));
}
