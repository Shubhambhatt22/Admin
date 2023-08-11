import React, { useState, useEffect } from "react";
import axios from "axios";
import { Flex } from "@chakra-ui/react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Button,
  Box,
  Center,
  Spinner,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";

const baseUrl = "https://ecom-backend-wdkk.onrender.com";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProductId, setEditedProductId] = useState("");
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    image: "",
    price: 0,
    stock: 0,
    description: "",
    sold: 0,
  });

  const toast = useToast();
  const tableSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });

  // Pages
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); // Number of products per page

  useEffect(() => {
    fetchProducts();
  }, [currentPage, isEditing]); // Fetch products when currentPage or isEditing changes

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/products/all`);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Calculate the index of the first and last products on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleDeleteClick = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/products/delete/${id}`);
      if (response.status === 200) {
        fetchProducts();
        toast({
          title: "Product Deleted successfully.",
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
      } else {
        console.error("Delete request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = (product) => {
    setIsEditing(true);
    setEditedProductId(product._id);
    setEditedProduct({
      name: product.name,
      image: product.image,
      price: product.price,
      stock: product.stock,
      description: product.description,
      sold: product.sold,
    });
  };

  const handleSaveEdit = async (id) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/products/update/${id}`,
        editedProduct
      );

      if (response.status === 200) {
        console.log("Product updated successfully:", response.data);
        toast({
          title: "Product Edited successfully.",
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
      } else {
        console.error("Unexpected response status:", response.status);
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProductId("");
    setEditedProduct({
      name: "",
      image: "",
      price: 0,
      stock: 0,
      description: "",
      sold: 0,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleTextAreaChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  if (products.length === 0) {
    return (
      <Center h="100vh">
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <Flex direction="column" align="center" p={5}>
      <h2>Product List</h2>
      <Table variant="striped" colorScheme="teal" size={tableSize}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Image</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th>Description</Th>
            <Th>Sold</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentProducts.map((product) => (
            <React.Fragment key={product._id}>
              <Tr>
                <Td>{product.name}</Td>
                <Td>
                  <Image
                    src={`${product.image}`}
                    alt={product.name}
                    maxW="80px"
                    maxH="80px"
                  />
                </Td>
                <Td>{product.price}</Td>
                <Td>{product.stock}</Td>
                <Td>{product.description}</Td>
                <Td>{product.sold}</Td>
                <Td>
                  <Button onClick={() => handleEditClick(product)}>Edit</Button>
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDeleteClick(product._id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>

              {/* Modal */}
              {isEditing && editedProductId === product._id && (
                <Tr>
                  <Td colSpan="8">
                    <Modal isOpen={isEditing} onClose={handleCancelEdit}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Edit Product</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                              name="name"
                              value={editedProduct.name}
                              onChange={handleInputChange}
                            />
                          </FormControl>
                          <FormControl mt={4}>
                            <FormLabel>Image URL</FormLabel>
                            <Input
                              name="image"
                              value={editedProduct.image}
                              onChange={handleInputChange}
                            />
                          </FormControl>
                          <FormControl mt={4}>
                            <FormLabel>Price</FormLabel>
                            <Input
                              name="price"
                              type="number"
                              value={editedProduct.price}
                              onChange={handleInputChange}
                            />
                          </FormControl>
                          <FormControl mt={4}>
                            <FormLabel>Stock</FormLabel>
                            <Input
                              name="stock"
                              type="number"
                              value={editedProduct.stock}
                              onChange={handleInputChange}
                            />
                          </FormControl>
                          <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                              name="description"
                              value={editedProduct.description}
                              onChange={handleTextAreaChange}
                            />
                          </FormControl>
                          <FormControl mt={4}>
                            <FormLabel>Sold</FormLabel>
                            <Input
                              name="sold"
                              type="number"
                              value={editedProduct.sold}
                              onChange={handleInputChange}
                            />
                          </FormControl>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => handleSaveEdit(product._id)}
                          >
                            Save
                          </Button>
                          <Button onClick={handleCancelEdit}>Cancel</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Td>
                </Tr>
              )}
            </React.Fragment>
          ))}
        </Tbody>
      </Table>

      {/* Pagination buttons */}
      <Flex mt={4} justify="center">
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Previous Page
        </Button>
        <Button
          ml={2}
          onClick={() => setCurrentPage(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        >
          Next Page
        </Button>
      </Flex>
    </Flex>
  );
}

export default ProductList;
