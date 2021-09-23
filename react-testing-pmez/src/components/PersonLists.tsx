export interface IPeople {
  firstName: string;
  lastName: string;
}

type TPersonListsProps = {
  people?: IPeople[];
};

const PersonLists = ({ people = [] }: TPersonListsProps) => {
  return (
    <ul>
      {people.map((person, index) => (
        <li key={`${person.firstName}${index}`}>
          {person.firstName} {person.lastName}
        </li>
      ))}
    </ul>
  );
};

export default PersonLists;
