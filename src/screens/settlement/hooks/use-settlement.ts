const useSettlement = () => {
  const props = {
    newLife: 'None',
    death: 'None',
    conviction: 'None',
    society: 'None',
  };

  const principleSelected = (_: string) => {};

  const actions = {
    principleSelected,
  };

  return {props, actions};
};

export default useSettlement;
