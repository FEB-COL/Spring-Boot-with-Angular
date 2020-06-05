package co.fuziontek.repository;

import co.fuziontek.domain.GearDocumentType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GearDocumentType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearDocumentTypeRepository extends JpaRepository<GearDocumentType, Long> {

}
