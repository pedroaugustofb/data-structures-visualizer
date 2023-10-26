/*
Ex:

data-structure:

    {
        value: 50,
        left-child: {
            value: 13,
            left-child: 7,
            right-child: 30,
        },
        rigth-child: {
            value:70
            left-child: null,
            rigth-child: 120,
        }
    }


    array_to_render = [50, 13, 70, 7, 30, null, 120]
    or
    array_to_render = [50, 13, 7, 30, 70, null, 120]

    render

                            50              
                    13              70
                7       30     null     120   

*/

type number_or_null = number | null;

export class TreeNode {
  constructor(public value: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

export default class BinaryTree {
  public _root: TreeNode | null = null;

  empty = () => this._root === null;

  /**
   *
   * @param {number} value
   * @returns {void}
   * Coloca um novo elemento na árvore binária seguindo a regra:
   * Se o valor for menor que o valor do nó atual, então o valor é colocado na sub-árvore esquerda.
   * Se o valor for maior que o valor do nó atual, então o valor é colocado na sub-árvore direita.
   */
  insert = (value: number) => {
    if (this.empty()) return (this._root = new TreeNode(value));

    let current = this._root;

    while (current !== null) {
      if (value < current.value) {
        if (current.left === null) {
          current.left = new TreeNode(value);
          return;
        }
        current = current.left;
      } else if (value > current.value) {
        if (current.right === null) {
          current.right = new TreeNode(value);
          return;
        }
        current = current.right;
      } else if (value === current.value) throw "Value already exists.";
    }
  };

  remove = (value: number) => {
    this._root = this._removeNode(this._root, value);
  };

  private _removeNode = (node: TreeNode | null, value: number): TreeNode | null => {
    if (node === null) {
      return null;
    }

    if (value < node.value) {
      node.left = this._removeNode(node.left, value);
    } else if (value > node.value) {
      node.right = this._removeNode(node.right, value);
    } else {
      // O nó atual tem o valor que queremos remover

      // Se o nó não tiver filhos, simplesmente o remova
      if (node.left === null && node.right === null) {
        node = null;
      }

      // Se o nó tiver apenas um filho, substitua-o pelo filho
      else if (node.left === null) {
        node = node.right;
      } else if (node.right === null) {
        node = node.left;
      }

      // Se o nó tiver dois filhos, encontre o menor valor à direita (ou o maior valor à esquerda)
      // e substitua o nó pelo valor encontrado, em seguida, remova o valor encontrado
      else {
        const minValue = this._findMinValue(node.right);
        node.value = minValue;
        node.right = this._removeNode(node.right, minValue);
      }
    }

    return node;
  };

  private _findMinValue = (node: TreeNode | null): number => {
    while (node?.left !== null) {
      node = node?.left as TreeNode;
    }
    return node?.value || 0;
  };

  search = (value: number): boolean => {
    return this._searchNode(this._root, value);
  };

  private _searchNode = (node: TreeNode | null, value: number): boolean => {
    if (node === null) {
      return false; // Valor não encontrado na árvore
    }

    if (value === node.value) {
      return true; // Valor encontrado na árvore
    } else if (value < node.value) {
      return this._searchNode(node.left, value); // Procure na subárvore esquerda
    } else {
      return this._searchNode(node.right, value); // Procure na subárvore direita
    }
  };
}
