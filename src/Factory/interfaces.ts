export interface AgentEvent {
    type: string;
    detail: string;
    [key: string]: any;
}

export interface Recipe {
    name?: string;
    ingredients: string[];
    substitutes?: Record<string, string>;
}
