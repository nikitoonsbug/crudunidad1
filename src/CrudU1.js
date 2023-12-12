import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrash, faEdit, faSave, faClose, faPlus } from '@fortawesome/free-solid-svg-icons';

const PageContainer = styled.div`

background-color: #343541;

`;

const OtherContainer = styled.div`
    margin-top: 0px;
    padding: 20px;
    margin-right: 20px;

`;

const CrudContainer = styled.div`
    margin-top: 20px;
    padding: 20px;
    text-align: right;
    margin-bottom: 87%;
`;


const FormContainer = styled.form`
  min-width: 400px;
  text-align: left;
  margin: 0 auto;
  padding: 30px;
  background-color: #71738d;

  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 18px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const ButtonForm = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 5px 10px;
  font-size: 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ButtonDelete = styled.button`
background-color: #e44d26;
color: white;
padding: 5px 10px;
font-size: 24px;
border: none;
border-radius: 4px;
cursor: pointer;
margin-right: 10px;
margin-bottom: 10px;
`;

const ButtonEdit = styled.button`
background-color: #f2db42;
color: white;
padding: 5px 10px;
font-size: 24px;
border: none;
border-radius: 4px;
cursor: pointer;
margin-right: 10px;
`;

const OverlayWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const OverlayContent = styled.div`
 
  padding: 20px;

`;

const StyledCloseButton = styled.button`
  background-color: #e44d26;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 24px;
  border-radius: 4px;
 margin-bottom: 10px;
  align-items: center;
  transition: background-color 0.3s ease;
  

  &:hover {
    background-color: #d14021;
  }
`;

const Overlay = ({ onClose, children }) => {
  return (
    <OverlayWrapper>
      <OverlayContent>
      <StyledCloseButton onClick={onClose}>
  <FontAwesomeIcon icon={faClose} />
</StyledCloseButton>
        <br/>
        {children}
      </OverlayContent>
    </OverlayWrapper>
  );
};

const ProductForm = ({ onSubmit, editingProduct, setEditingProduct }) => {
  const [product, setProduct] = useState({
    id: editingProduct ? editingProduct.id : null,
    nombre: editingProduct ? editingProduct.nombre : '',
    descripcion: editingProduct ? editingProduct.descripcion : '',
  });

  useEffect(() => {
    // Actualiza el estado del formulario cuando el producto a editar cambia
    setProduct({
      id: editingProduct ? editingProduct.id : null,
      nombre: editingProduct ? editingProduct.nombre : '',
      descripcion: editingProduct ? editingProduct.descripcion : '',
    });
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct !== null) {
      // Si estamos editando, llamamos a la función de edición
      onSubmit(product, editingProduct);
      setEditingProduct(null); // Limpiamos el estado de edición
    } else {
      // Si no estamos editando, llamamos a la función de creación
      onSubmit({ ...product, id: product.length + 1 }, null);
      setProduct({
        id: null,
        nombre: '',
        descripcion: '',
      });
    }
  };
  
  return (
    <FormContainer onSubmit={handleSubmit}>
      <Label>
        Nombre:
        <Input
          type="text"
          name="nombre"
          value={product.nombre}
          onChange={handleChange}
        />
      </Label>
      <br />
      <Label>
        Descripción:
        <TextArea
          name="descripcion"
          value={product.descripcion}
          onChange={handleChange}
        />
      </Label>
      <br />
      <ButtonForm type="submit">
        <FontAwesomeIcon icon={editingProduct ? faSave : faPlus} />
      </ButtonForm>
    </FormContainer>
  );
};


const ProductListContainer = styled.div`
  
  margin: 20px auto;
  padding: 20px;

`;

const ProductTable = styled.table`
  border-spacing: 0;
  margin: 20px auto;
  padding: 20px;
  width: 100%;
  margin-right: 30px;
  border-collapse: collapse;
  overflow-x: auto; /* Agrega scroll horizontal */
`;

const TableHeader = styled.th`
  border: 4px solid #343541;
  padding: 10px;
  text-align: left;
  background-color: #71738d;
`;

const TableRow = styled.tr`
text-align: left;
    background-color: #71738d;
  
`;

const TableCell = styled.td`
  border: 4px solid #343541;
  padding: 10px;
`;

const ProductItem = ({ product, onDelete, onEdit }) => {
  return (
    <TableRow>
      <TableCell>{product.id}</TableCell>
      <TableCell>{product.nombre}</TableCell>
      <TableCell>{product.descripcion}</TableCell>
      <TableCell>
        <ButtonDelete onClick={() => onDelete(product.id)}>
            <FontAwesomeIcon icon={faTrash} />
            </ButtonDelete>
        <ButtonEdit onClick={() => onEdit(product)}>
          <FontAwesomeIcon icon={faEdit} />
        </ButtonEdit>
      </TableCell>
    </TableRow>
  );
};

const ProductList = ({ products, onDelete, onEdit }) => {
  return (
    <ProductListContainer>
      <ProductTable>
        <thead>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>Nombre</TableHeader>
            <TableHeader>Descripción</TableHeader>
            <TableHeader>Acciones</TableHeader>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </ProductTable>
    </ProductListContainer>
  );
};

const AddButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 5px 10px;
  text-align: right;
  border: none;
  margin-right: 30px;
  border-radius: 4px;
  font-size: 30px;
  cursor: pointer;
  display: inline-block;
  &:hover {
    background-color: #45a049;
  }
`;



const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productIdCounter, setProductIdCounter] = useState(1);
    const [showFormOverlay, setShowFormOverlay] = useState(false);
  
  const handleAddProduct = (newProduct, editingProduct) => {
    if (editingProduct !== null) {
      // Si estamos editando, actualizamos el producto existente
      setProducts((prevProducts) => {
        const newProducts = [...prevProducts];
        const index = prevProducts.findIndex((p) => p.id === editingProduct.id);
        newProducts[index] = newProduct;
        return newProducts;
      });

    } else {
      // Si no estamos editando, agregamos un nuevo producto con el ID del contador
      setProducts((prevProducts) => [...prevProducts, { ...newProduct, id: productIdCounter }]);
      // Incrementamos el contador para el próximo producto
      setProductIdCounter((prevCounter) => prevCounter + 1);
    }
    setShowFormOverlay(false);
  };

 

  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowFormOverlay(true);
  };

  const handleOverlayClose = () => {
    setEditingProduct(null);
    setShowFormOverlay(false);
  };

  return (
    <PageContainer>
    <OtherContainer>
    <CrudContainer>

        <AddButton onClick={() => setShowFormOverlay(true)}>
        
          <FontAwesomeIcon icon={faPlusCircle} />

        </AddButton>
    
      {showFormOverlay && (
        <Overlay onClose={handleOverlayClose}>
          <ProductForm
            onSubmit={handleAddProduct}
            editingProduct={editingProduct}
            setEditingProduct={setEditingProduct}
          />
        </Overlay>
      )}
      <ProductList
        products={products}
        onDelete={handleDeleteProduct}
        onEdit={handleEditProduct}
      />
    </CrudContainer>
    </OtherContainer>
    </PageContainer>
  );
};

export default ProductManagement;
