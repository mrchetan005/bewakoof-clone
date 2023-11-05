

const NoResult = () => {
    return (
        <div className="noResultsFound px-4 text-center pb-10">
            <img src="/assets/images/others/no-result.svg" alt="" className="mt-16 mb-9 object-cover m-auto" />
            <div className="mt-6 px-2">
                <h3 className="mb-6 font-semibold text-[#292d35]">Oops! No results found.</h3>
                <p className="text-sm text-[#4e5664]">Check the spelling or try looking for something else.</p>
            </div>
        </div>
    )
}

export default NoResult;