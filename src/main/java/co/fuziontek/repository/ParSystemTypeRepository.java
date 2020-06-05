package co.fuziontek.repository;

import co.fuziontek.domain.ParSystemType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ParSystemType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParSystemTypeRepository extends JpaRepository<ParSystemType, Long> {

}
