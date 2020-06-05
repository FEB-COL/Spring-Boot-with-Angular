package co.fuziontek.repository;

import co.fuziontek.domain.GearPortfolio;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the GearPortfolio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearPortfolioRepository extends JpaRepository<GearPortfolio, Long> {

    List<GearPortfolio> findByGearOrganizationalUnit_Id(Long organizationalUnitId);

}
