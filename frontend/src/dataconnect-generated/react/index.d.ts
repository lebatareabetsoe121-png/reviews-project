import { AddProductToCartData, AddProductToCartVariables, GetProductsByCategoryData, GetProductsByCategoryVariables, GetUserOrdersData, CreateUserData, CreateUserVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useAddProductToCart(options?: useDataConnectMutationOptions<AddProductToCartData, FirebaseError, AddProductToCartVariables>): UseDataConnectMutationResult<AddProductToCartData, AddProductToCartVariables>;
export function useAddProductToCart(dc: DataConnect, options?: useDataConnectMutationOptions<AddProductToCartData, FirebaseError, AddProductToCartVariables>): UseDataConnectMutationResult<AddProductToCartData, AddProductToCartVariables>;

export function useGetProductsByCategory(vars: GetProductsByCategoryVariables, options?: useDataConnectQueryOptions<GetProductsByCategoryData>): UseDataConnectQueryResult<GetProductsByCategoryData, GetProductsByCategoryVariables>;
export function useGetProductsByCategory(dc: DataConnect, vars: GetProductsByCategoryVariables, options?: useDataConnectQueryOptions<GetProductsByCategoryData>): UseDataConnectQueryResult<GetProductsByCategoryData, GetProductsByCategoryVariables>;

export function useGetUserOrders(options?: useDataConnectQueryOptions<GetUserOrdersData>): UseDataConnectQueryResult<GetUserOrdersData, undefined>;
export function useGetUserOrders(dc: DataConnect, options?: useDataConnectQueryOptions<GetUserOrdersData>): UseDataConnectQueryResult<GetUserOrdersData, undefined>;

export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
