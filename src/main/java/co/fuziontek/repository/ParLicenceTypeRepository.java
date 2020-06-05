package co.fuziontek.repository;

import co.fuziontek.domain.ParLicenceType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ParLicenceType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParLicenceTypeRepository extends JpaRepository<ParLicenceType, Long> {

}
