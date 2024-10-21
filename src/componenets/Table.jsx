const TableComponent = (props) =>{
    const { theadArrProps, userDataProps} = props

    const THeadComponent = () => {
      return (
        <thead>
          <tr>
            {theadArrProps.map((item, index) => (
              <th style={{ fontWeight: 700, padding: "0.5rem" }} key={index}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
      );
    };
  
    const TBodyComponent = () => {
      let curPageData = userDataProps.slice(startIndex, endIndex);
  
      const TDComponent = ({ content }) => {
        return (
          <td style={{ padding: "0.5rem", fontSize: "0.8rem" }}>{content}</td>
        );
      };
  
      return (
        <tbody>
          {curPageData.map((item) => (
            <tr key={item.id}>
              <TDComponent content={item.id} />
              <TDComponent content={item.name} />
              <TDComponent content={item.username} />
              <TDComponent content={item.email} />
              <TDComponent
                content={`${item.address.street}, ${item.address.suite}, ${item.address.city}, ${item.address.zipcode}`}
              />
              <TDComponent content={`${item.address.geo.lat}, ${item.address.geo.lng}`} />
              <TDComponent content={item.phone} />
              <TDComponent content={item.website} />
              <TDComponent content={item.company.name} />
              <TDComponent content={item.company.catchPhrase} />
              <TDComponent content={item.company.bs} />
            </tr>
          ))}
        </tbody>
      );
    };
  
    return (
        <>
        <table style={{ display: "block", overflowX: "scroll" }}>
            <THeadComponent />
            <TBodyComponent />
        </table>
        </>
    )
}

export default TableComponent;