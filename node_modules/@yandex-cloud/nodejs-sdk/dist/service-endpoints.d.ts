import { ServiceDefinition } from '@grpc/grpc-js';
import { GeneratedServiceClientCtor } from './types';
export declare const getServiceClientEndpoint: <T extends ServiceDefinition<import("@grpc/grpc-js").UntypedServiceImplementation>>(generatedClientCtor: GeneratedServiceClientCtor<T>) => string;
