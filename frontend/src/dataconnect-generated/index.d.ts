import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddProductToCartData {
  cartItem_insert: CartItem_Key;
}

export interface AddProductToCartVariables {
  cartId: UUIDString;
  productId: UUIDString;
  quantity: number;
}

export interface CartItem_Key {
  cartId: UUIDString;
  productId: UUIDString;
  __typename?: 'CartItem_Key';
}

export interface Cart_Key {
  id: UUIDString;
  __typename?: 'Cart_Key';
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  displayName: string;
  email: string;
}

export interface GetProductsByCategoryData {
  products: ({
    id: UUIDString;
    name: string;
    description: string;
    price: number;
    imageUrl?: string | null;
    stockQuantity?: number | null;
  } & Product_Key)[];
}

export interface GetProductsByCategoryVariables {
  category: string;
}

export interface GetUserOrdersData {
  orders: ({
    id: UUIDString;
    orderDate: TimestampString;
    paymentMethod?: string | null;
    shippingAddress?: string | null;
    status: string;
    totalAmount: number;
    orderItems_on_order: ({
      product: {
        id: UUIDString;
        name: string;
        description: string;
        price: number;
        imageUrl?: string | null;
      } & Product_Key;
        quantity: number;
        priceAtPurchase: number;
    })[];
  } & Order_Key)[];
}

export interface OrderItem_Key {
  orderId: UUIDString;
  productId: UUIDString;
  __typename?: 'OrderItem_Key';
}

export interface Order_Key {
  id: UUIDString;
  __typename?: 'Order_Key';
}

export interface Product_Key {
  id: UUIDString;
  __typename?: 'Product_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface AddProductToCartRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddProductToCartVariables): MutationRef<AddProductToCartData, AddProductToCartVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddProductToCartVariables): MutationRef<AddProductToCartData, AddProductToCartVariables>;
  operationName: string;
}
export const addProductToCartRef: AddProductToCartRef;

export function addProductToCart(vars: AddProductToCartVariables): MutationPromise<AddProductToCartData, AddProductToCartVariables>;
export function addProductToCart(dc: DataConnect, vars: AddProductToCartVariables): MutationPromise<AddProductToCartData, AddProductToCartVariables>;

interface GetProductsByCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProductsByCategoryVariables): QueryRef<GetProductsByCategoryData, GetProductsByCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetProductsByCategoryVariables): QueryRef<GetProductsByCategoryData, GetProductsByCategoryVariables>;
  operationName: string;
}
export const getProductsByCategoryRef: GetProductsByCategoryRef;

export function getProductsByCategory(vars: GetProductsByCategoryVariables): QueryPromise<GetProductsByCategoryData, GetProductsByCategoryVariables>;
export function getProductsByCategory(dc: DataConnect, vars: GetProductsByCategoryVariables): QueryPromise<GetProductsByCategoryData, GetProductsByCategoryVariables>;

interface GetUserOrdersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserOrdersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUserOrdersData, undefined>;
  operationName: string;
}
export const getUserOrdersRef: GetUserOrdersRef;

export function getUserOrders(): QueryPromise<GetUserOrdersData, undefined>;
export function getUserOrders(dc: DataConnect): QueryPromise<GetUserOrdersData, undefined>;

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

