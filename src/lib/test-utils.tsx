import React from "react";
import {render, RenderOptions} from "@testing-library/react";
import {configureStore, Reducer, Store, UnknownAction} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import {RootState} from "../store";
import repositoryReducer, {RepositoryState} from "@/features/repositories/repositoriesSlice.ts";

interface CustomRenderOptions extends RenderOptions {
    preloadedState?: {
        repositories: RepositoryState;
    };
    store?: Store<RootState>;
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState,
        store = configureStore({
            reducer: {
                repositories: repositoryReducer as Reducer<RepositoryState, UnknownAction, RepositoryState | undefined>,
            },
            preloadedState,
        }),
        ...renderOptions
    }: CustomRenderOptions = {}
) {
    function Wrapper({children}: { children: React.ReactNode }) {
        return <Provider store={store}>{children}</Provider>;
    }

    return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})};
}