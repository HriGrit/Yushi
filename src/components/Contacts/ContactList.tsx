interface ContactListProps {
    data: any;
}
const ContactList: React.FC<ContactListProps> = ({ data }) => {
    console.log(data);
    
    return (
        <div>ContactList</div>
    )
}

export default ContactList  