export type Repository = {
    id: number,
    name: string,
    full_name: string,
    private: boolean,
    owner: {
        login: string,
        id: number,
        avatar_url: string,
        html_url: string,
    },
    html_url: string,
    description: string,
    fork: boolean,
    url: string,
    created_at: string,
    updated_at: string,
    clone_url: string,
    stargazers_count: number,
    watchers_count: number,
    language: string,
    forks_count: number,
    topics: string[]
    forks: number,
    watchers: number,
}


export type SearchQuery = {
    searchTerm: string,
    page: number,
    order: string,
    sort: string
};

