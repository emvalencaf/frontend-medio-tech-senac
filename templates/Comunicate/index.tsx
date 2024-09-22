import { FaBullhorn } from "react-icons/fa";
import Header from "../../components/Header";
import ComunicatePanel from "../../components/ComunicatePanel";
import PanelFilter from "../../components/PanelFilter";
import AnnouncementsContainer from "../../components/AnnouncementsContainer";
import { mockAnnouncements } from "../../constants/announcementsMock";

const ComunicateTemplate: React.FC = () => {
    return (
        <div className="w-full">
            <Header title="Comunicados" Icon={FaBullhorn}  />
            <PanelFilter />
            <AnnouncementsContainer announcements={[
    {
        id: 1,
        title: 'Inaugurei um novo parque no bairro da Boa Vista, vocês farão um software para ajudar o meio ambiente',
        postDate: new Date(),
        author: {
            name: "João Campos",
            avatarUrl: '/assets/avatar.png',
        },
        content: 'Vocês farão um software com Machine Learning para identificar pessoas que estão passeando com seus animais de estimação e não estão recolhendo as fezes deles. O objetivo é que a Prefeitura do Recife planeja multar esses donos de animais. O projeto se chama: Fezes Zero! Vocês serão avaliados por esse projeto, boa sorte!',
    }
]} itemsPerPage={0} />
        </div>
    );
}

export default ComunicateTemplate;