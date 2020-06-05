package co.fuziontek.repository;

import co.fuziontek.domain.ParCoinType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ParCoinType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParCoinTypeRepository extends JpaRepository<ParCoinType, Long> {

}
