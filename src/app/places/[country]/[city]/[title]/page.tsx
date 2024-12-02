export default function PlacePage({
                                      params
                                  }: {
    params: {
        country: string,
        city: string,
        title: string
    }
}) {
    return (
        <div>
            <h1>{params.title}</h1>
            <p>Country: {params.country}</p>
            <p>City: {params.city}</p>
        </div>
    )
}