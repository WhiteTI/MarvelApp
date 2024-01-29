import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import {Helmet} from "react-helmet";

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our comics"
                />
                <title>Comics Page</title>
            </Helmet>
            <ErrorBoundary>
                <AppBanner/>
            </ErrorBoundary>
            <ErrorBoundary>
                <ComicsList/>
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;